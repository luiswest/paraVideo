<?php
namespace App\controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Psr\Container\ContainerInterface;

use PDO;

class Mecanico extends ServicioCurl {
    private const ENDPOINT = "/mecanico";

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
        $body = $request->getBody();

        $resp = $this->ejecutar(self::ENDPOINT, 'POST', $body);
        $response->getBody()->write($resp['body']);
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($resp['status']);
        
    }
    public function update(Request $request, Response $response, array $args) {
        
        $id_mecanico = $args['id'];

        $body = $request->getBody();
        $uri = self::ENDPOINT . "/$id_mecanico";

        $resp = $this->ejecutar($uri, 'PUT', $body);
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

        $uri = self::ENDPOINT . "/filter/{args['pag']/{args['lim']}?" . $datos;
        

        $resp = $this->ejecutar( $uri, 'GET');

        $response->getBody()->write($resp['body']);
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($resp['status']);
    }
}