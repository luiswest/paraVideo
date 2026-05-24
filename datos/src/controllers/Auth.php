<?php
    namespace App\controllers;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;
   
    class Auth extends Autenticar {

        function login(Request $request, Response $response, $args) {
            $body = json_decode($request->getbody());

            if($datos = $this->autenticar($body->cedula, $body->passw)) {
                $retorno = array_merge(["cedula" => $body->cedula], $datos);
                $status = 200;
            } else {
                $retorno = ["error" => "Credenciales incorrectas"];
                $status = 401;
            }

            $response->getBody()->write(json_encode($retorno));

            return $response->withHeader('Content-type', 'Application/json')
                            ->withStatus($status);
        }

        function logout(Request $request, Response $response, $args) {
            $this->modificarToken(cedula: $args['id']);
            return $response->withStatus(200);
        }
    }