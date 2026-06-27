<?php
namespace App\controllers;
use Firebase\JWT\JWT;
trait Token {
    protected function generarToken(string $idUsuario, int $rol, string $nombre = "") {
        $key = $_ENV['KEY'];
        $payload = [
            'iss' => $_SERVER['SERVER_NAME'],
            'iat' => time(),
            'exp' => time() + 45, // 30 minutos
            'sub' => $idUsuario,
            'rol' => $rol,
            'nom' => $nombre
        ];
        $payloadRef = [
            'iss' => $_SERVER['SERVER_NAME'],
            'iat' => time(),
            'rol' => $rol
        ];
        return [
            "token" => JWT::encode($payload, $key, 'HS256'),
            "tkRef" => JWT::encode($payloadRef, $key, 'HS256'),
        ];            
    }

    private function modificarToken(string $cedula, string $tkRef = "") {

        $url = "/token/modificar";
        

        return $this->ejecutar($url, 'PATCH', json_encode(['cedula' => $cedula, 'tkRef' => $tkRef]));

    }
    protected function verificarToken(string $cedula, string $tkRef) {
        
        $url = "/token/verificar/$cedula";
        return $this->ejecutar($url, 'PATCH', json_encode(['tkRef' => $tkRef]));

    }        
}
