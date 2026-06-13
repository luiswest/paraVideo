<?php
namespace App\controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Psr\Container\ContainerInterface;

use PDO;

class Cliente  {
   // private $container;
    public function __construct(private ContainerInterface $container) {
        //$this->container = $container;
    }

    public function read(Request $request, Response $response, array $args) {
        $sql = "SELECT * FROM clientes ";

        if (isset($args['id'])) {
            $sql .= "WHERE id_cliente = :id ;";
        }
       // $sql .= 'LIMIT 0, 10;';

        $con = $this->container->get('base_datos');
        $query = $con->prepare($sql);

        if (isset($args['id'])) {
            $query->execute(["id" => $args['id']]);
        } else {
            $query->execute();
        }

        $res = $query->fetchAll();

        $status = $query->rowCount() > 0 ? 200 : 204;

        $query = null;
        $con = null;

        $response->getBody()->write(json_encode($res));
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($status);
    }
    public function create(Request $request, Response $response, array $args) {
        $body = json_decode($request->getBody());

        $sql = "INSERT INTO clientes (cedula, nombre, telefono, email) 
        VALUES (:cedula, :nombre, :telefono, :email);";

        $con = $this->container->get('base_datos');

        $con->beginTransaction();

        try {
            $query = $con->prepare($sql);
            foreach ($body as $key => $value) {
                $tipo = gettype($value) == 'integer' ? PDO::PARAM_INT : PDO::PARAM_STR;
                $value = filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS);
                $query->bindValue($key, $value, $tipo);
            }
            $query->execute();
            //Crear cuenta de usuario
            $sql = "INSERT INTO Usuarios (cedula, passw, rol) 
                VALUES(:cedula, :passw, :rol);";

            $passw = password_hash($body->cedula, PASSWORD_BCRYPT, ['cost'=> 10]);
            $rol = 3;

            $query = $con->prepare($sql);
            $query->bindValue('cedula', $body->cedula, PDO::PARAM_STR);
            $query->bindValue('passw', $passw, PDO::PARAM_STR);
            $query->bindValue('rol', $rol, PDO::PARAM_INT);

            $query->execute();

            $con->commit();
            $status = 201;
        } catch(\PDOException $e) {
         
            $status = match($e->getCode()) {
                "23000"=> 409,
                "42S02" => 501,
                default => 500
            };
            $con->rollback();
            $response->getBody()->write(json_encode(["msg" => $e->getMessage()]));
        }
        $query = null;
        $con = null;

        $response->getBody()->write(json_encode($body));
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($status);
        
    }
    public function update(Request $request, Response $response, array $args) {
        $body = json_decode($request->getBody());
        
        $id_cliente = $args['id'];

        $sql = "UPDATE clientes SET
            cedula = :cedula, 
            nombre = :nombre, 
            telefono = :telefono,
            email =  :email 
            WHERE id_cliente = :id_cliente";

        $con = $this->container->get('base_datos');
        try {
            $query = $con->prepare($sql);
            foreach ($body as $key => $value) {
                $tipo = gettype($value) == 'integer' ? PDO::PARAM_INT : PDO::PARAM_STR;
                $value = filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS);
                $query->bindValue($key, $value, $tipo);
            }
            $query->bindValue('id_cliente', $id_cliente, PDO::PARAM_INT);

            $query->execute();

            $status = 200;
        } catch(\PDOException $e) {
         
            $status = match($e->getCode()) {
                23000 => 409,
                "42S02" => 501,
                default => 500
            };
            $response->getBody()->write(json_encode(["msg" => $e->getMessage()]));
        }
        $query = null;
        $con = null;

        $response->getBody()->write(json_encode($body));
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($status);
        
    }
    public function delete(Request $request, Response $response, array $args) {
        
        $id_cliente = $args['id'];

        $sql = "DELETE FROM clientes WHERE id_cliente = :id_cliente";

        $con = $this->container->get('base_datos');
        try {
            $query = $con->prepare($sql);

         //   $query->bindValue('id_cliente', $id_cliente, PDO::PARAM_INT);
         //   $query->execute();

            $query->execute(['id_cliente' => $id_cliente]);

            $status = $query->rowCount() > 0 ? 200 : 404;

          //  $status = 200;
        } catch(\PDOException $e) {
         
            $status =  500 ;
         //   $response->getBody()->write(json_encode(["msg" => $e->getMessage()]));
        }
        $query = null;
        $con = null;

        return $response->withStatus($status);
        
    }
    public function filter(Request $request, Response $response, array $args) {
        
        $datos = $request->getQueryParams();
       
        $sql = "SELECT *, COUNT(*) OVER() as total FROM clientes 
            WHERE cedula LIKE :cedula AND nombre LIKE :nombre ";
        $sql .= "LIMIT :offset, :limit;";


        $con = $this->container->get('base_datos');
        try {
            $query = $con->prepare($sql);

            foreach ($datos as $key => $value) {
                $value = filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS);
                $query->bindValue($key, "%$value%", PDO::PARAM_STR);
            }
            $pag = $args['pag'] > 0 ? ($args['pag'] * $args['lim']) : 0;

            $query->bindValue('offset', (int)$pag, PDO::PARAM_INT);
            $query->bindValue('limit', (int)$args['lim'], PDO::PARAM_INT);
            $query->execute();
            $data = $query->fetchAll(PDO::FETCH_OBJ);
            //var_dump($data);die();

            $total = $data[0]->total ?? 0;

            $data = array_map(function($item) {
                unset($item->total);
                return $item;
            }, $data);
       
/*
            foreach ($data as $key => $value) {
                unset($data[$key]->total);
            }

*/

            $res['data'] = $data;
            $res['totalRegistros'] = $total;

            $status = $total > 0 ? 200 : 204;

        } catch(\PDOException $e) {
            $status =  500;
                $res = ["msg" => $e->getMessage(), "codigo" => $e->getCode()];
            //$res = ["msg" => "Se detecto error en tiempo de ejecución"];
        }
        $query = null;
        $con = null;

        $response->getBody()->write(json_encode($res));
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($status);
    }
}