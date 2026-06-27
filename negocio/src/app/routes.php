<?php
namespace App\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Slim\Routing\RouteCollectorProxy;

$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->group('/api', function(RouteCollectorProxy $api) {
    $api->group('/cliente', function(RouteCollectorProxy $endpoint) {
        
        $endpoint->get('[/{id}]', Cliente::class . ':read');
        $endpoint->post('', Cliente::class . ':create');
        $endpoint->put('/{id}', Cliente::class . ':update');
        $endpoint->delete('/{id}', Cliente::class . ':delete');
        $endpoint->get('/filter/{pag}/{lim}', Cliente::class . ':filter');

    });
    $api->group('/mecanico', function(RouteCollectorProxy $endpoint) {
        
        $endpoint->get('[/{id}]', Mecanico::class . ':read');
        $endpoint->post('', Mecanico::class . ':create');
        $endpoint->put('/{id}', Mecanico::class . ':update');
        $endpoint->delete('/{id}', Mecanico::class . ':delete');
        $endpoint->get('/filter/{pag}/{lim}', Mecanico::class . ':filter');

    });
        $api->group('/auth', function(RouteCollectorProxy $endpoint) {
        $endpoint->patch('', Auth::class . ':login');
        $endpoint->patch('/logout/{id}', Auth::class . ':logout');
        $endpoint->patch('/refresh/{id}', Auth::class . ':refresh');
    });


    $api->group('/usuario', function(RouteCollectorProxy $endpoint) {
        $endpoint->patch('/passw/{id}', Usuario::class . ':changePassw');
        $endpoint->patch('/passw/reset/{id}', Usuario::class . ':resetPassw');
        $endpoint->patch('/rol/{id}', Usuario::class . ':changeRol');
        $endpoint->get('/buscar/{id}', Usuario::class . ':buscar');
    });
});

$app->get('/swagger', function ($request, $response) {
    return $response
        ->withHeader('Location', '/swagger.html')
        ->withStatus(302);
});

$app->get('/openapi.json', function ($request, $response) {
    $json = file_get_contents(__DIR__ . '/../../public/openapi.json');
    $response->getBody()->write($json);
    return $response->withHeader('Content-Type', 'application/json');
});