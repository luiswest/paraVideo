<?php
namespace App\controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;
use Firebase\JWT\JWT;
use PDO;
class Token {

    public function __construct(protected ContainerInterface $container) {}
    
    private function accederToken(string $proc, string $idUsuario, $tkRef = "") {
        $sql = $proc === "modificar" ? "SELECT modificarToken " : "CALL verificarToken ";
        $sql .= "(:idUsuario, :tkRef);";

        $con = $this->container->get('base_datos');
        $query = $con->prepare($sql);

        $query->execute(['idUsuario' => $idUsuario, 'tkRef' => $tkRef]);

        $datos = $proc === 'modificar' ? $query->fetch(PDO::FETCH_NUM) : $query->fetchColumn();

        $query = null;
        $con = null;
        return $datos;
    }
    public function modificarToken(Request $request, Response $response, array $args) {
        $datos = json_decode($request->getBody());

        $sql = "UPDATE Usuarios SET tkRef = :tkRef";
        if ($datos->tkRef != "") $sql .= ", ultimo_acceso  = now() ";
        $sql .= " WHERE cedula = :cedula";
        $con = $this->container->get('base_datos');
        $query = $con->prepare($sql);
        $query->execute(['cedula' => $datos->cedula, 'tkRef' => $datos->tkRef]);

        $datos = $query->fetch(PDO::FETCH_NUM);
    
        $query = null;
        $con = null;

        $response->getBody()->write(json_encode($datos));
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus(200);        

    }

    public function verificarToken(Request $request, Response $response, array $args) {
        $cedula = $args['id'];
        $tkRef = json_decode($request->getBody())->tkRef;
        $sql = "SELECT rol FROM usuarios WHERE cedula = :cedula AND tkRef = :tkRef";
        $con = $this->container->get('base_datos');
        $query = $con->prepare($sql);
        $query->execute(['cedula' => $cedula, 'tkRef' => $tkRef]);
        
        $datos = $query->fetch(PDO::FETCH_ASSOC);

        $status = $query->rowCount() > 0 ? 200 : 401;
        
        $query = null;
        $con = null;
        $response->getBody()->write(json_encode($datos));
        return $response
            ->withHeader('Content-Type','Application/json')
            ->withStatus($status); 
    }        
}
