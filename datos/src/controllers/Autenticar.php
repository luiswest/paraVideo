<?php
    namespace App\controllers;

    use Psr\Container\ContainerInterface;

    use PDO;

    class Autenticar {
        protected $container;
        public function __construct(ContainerInterface $c) {
            $this->container = $c;
        }

        protected function autenticar($idUsuario, $pass) {
            $sql = "SELECT * FROM Usuarios WHERE cedula = :idUsuario ";

            $con = $this->container->get('base_datos');
            $query = $con->prepare($sql);
            $query->bindValue("idUsuario", $idUsuario, PDO::PARAM_STR);
            $query->execute();
 
            $datos = $query->fetch();

            if ($datos && password_verify($pass, $datos->passw)) {
                $recurso = match($datos->rol) {
                    1 => "Administradores",
                    2 => "Mecanicos",
                    3 => "Clientes"
                };

                $sql = "SELECT * FROM $recurso WHERE cedula = :id_Usuario ";

                $query = $con->prepare($sql);
                $query->bindValue("id_Usuario", $datos->cedula, PDO::PARAM_STR);
                $query->execute();

                $rol= $datos->rol;

                $datos = $query->fetch();
                $retorno = ["nombre" => $datos->nombre, "rol" => $rol];
            }
            $query = null;
            $con = null;

            return isset($retorno) ? $retorno : false;

        }
    }