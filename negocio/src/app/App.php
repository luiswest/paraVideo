<?php

use Slim\Factory\AppFactory;
use JimTools\JwtAuth\Middleware\JwtAuthentication;
use JimTools\JwtAuth\Options;
use JimTools\JwtAuth\Decoder\FirebaseDecoder;
use JimTools\JwtAuth\Secret;
use JimTools\JwtAuth\Rules\RequestMethodRule;
use JimTools\JwtAuth\Rules\RequestPathRule;
use JimTools\JwtAuth\Exceptions\AuthorizationException;

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable('/var/www/html');

$dotenv->load();

$app = AppFactory::create();

$rules = [
  new RequestMethodRule(ignore: ['OPTIONS']),
  new RequestPathRule(
    paths: ['/api'], 
    ignore: ['/api/auth'])
];

// Register Authentication Middleware
$decoder = new FirebaseDecoder(new Secret($_ENV['KEY'], 'HS256'));
$authentication = new JwtAuthentication(new Options(), $decoder, $rules, ["secure" => false]);

$app->addMiddleware($authentication);


$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$errorMiddleware->setErrorHandler(
    AuthorizationException::class,
    function ($request, $exception, $displayErrorDetails) use ($app) {
        $response = $app->getResponseFactory()->createResponse();
        $response->getBody()->write(json_encode([
            "error" => "El token ha expirado",
            "code" => 401
        ]));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }
);

require_once 'routes.php';

$app->run();
