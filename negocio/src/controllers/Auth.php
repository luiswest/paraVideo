<?php
namespace App\controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


class Auth extends ServicioCURL {
    use Token, Autenticar;
    public function login(Request $request, Response $response, array $args) {
        $body = json_decode($request->getBody());

        if($datos = $this->autenticar($body->cedula, $body->passw)) {
            $tokens = $this->generarToken($datos->cedula, $datos->rol, $datos->nombre);

            $this->modificarToken(cedula: $datos->cedula, tkRef: $tokens['tkRef']);
            
        } else {
            $tokens = ["error" => "Credenciales incorrectas"];
            
        }
        $response->getBody()->write(json_encode($tokens));
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($datos ? 200 : 401);            
    }
    public function logout(Request $request, Response $response, array $args) {
        
        $resp = $this->modificarToken(cedula: $args['id']);

        return $response
            ->withStatus($resp ? 200 : 401);
    }
    public function refresh(Request $request, Response $response, array $args) {
        $body = json_decode($request->getBody());
                 
        $datos = $this->verificarToken($args['id'], $body->tkRef);        
        
        $body = json_decode($datos['body']);
        $status = json_decode($datos['status']);
     
         if ($status === 200) {
            $tokens = $this->generarToken($args['id'], $body->rol);
            $this->modificarToken(cedula: $args['id'], tkRef: $tokens['tkRef']);

            $response->getBody()->write(json_encode($tokens));
        }
       return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}