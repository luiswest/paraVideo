<?php
namespace App\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\validators\ClienteValidator;

class Cliente extends ServicioCurl {
    private const ENDPOINT = "/cliente";

    public function read(Request $request, Response $response, array $args) {

        $url = self::ENDPOINT;
        if (isset($args['id'])) {
            $url .= "/{$args['id']}";
        }

        $resp = $this->ejecutar($url, 'GET');

        $response->getBody()->write($resp['body']);
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($resp['status']);
    }
    public function create(Request $request, Response $response, array $args) {
        $body = json_decode($request->getBody());

        $validator = new ClienteValidator();
        $errors = $validator->validateCreate($body);

        if (!empty($errors)) {
            $response->getBody()->write(json_encode(['errors' => $errors]));
            return $response
                ->withHeader('Content-Type','Application/json')
                ->withStatus(422);
        }

        $resp = $this->ejecutar(self::ENDPOINT, 'POST', json_encode($body));
        $response->getBody()->write($resp['body']);
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($resp['status']);
        
    }
    public function update(Request $request, Response $response, array $args) {
        
        $id_cliente = $args['id'];
        $body = json_decode($request->getBody());

        $validator = new ClienteValidator();
        $errors = $validator->validateUpdate($body);

        if (!empty($errors)) {
            $response->getBody()->write(json_encode(['errors' => $errors]));
            return $response
                ->withHeader('Content-Type','Application/json')
                ->withStatus(422);
        }

        $uri = self::ENDPOINT . "/$id_cliente";

        $resp = $this->ejecutar($uri, 'PUT', json_encode($body));
        $response->getBody()->write($resp['body']);
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($resp['status']);
        
    }
    public function delete(Request $request, Response $response, array $args) {
    
        $uri = self::ENDPOINT . "/{$args['id']}";
        $resp = $this->ejecutar($uri, 'DELETE'); 
        return $response->withStatus($resp['status']);
        
    }
    public function filter(Request $request, Response $response, array $args) {
        
        $datos = http_build_query($request->getQueryParams());
        
         $uri = self::ENDPOINT . "/filter/{$args['pag']}/{$args['lim']}?" . $datos;

        $resp = $this->ejecutar( $uri, 'GET');

        $response->getBody()->write($resp['body']);
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($resp['status']);
    }
}