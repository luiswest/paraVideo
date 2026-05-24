<?php

use Slim\Factory\AppFactory;

use DI\Container;

require __DIR__ . '/../../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable('/var/www/html');
$dotenv->load();
$container = new Container();


AppFactory::setContainer($container);

$app = AppFactory::create();

require_once 'config.php';
require_once 'conexion.php';
require_once 'routes.php';

$app->run();
