<?php
    namespace App\controllers;

    trait Autenticar {

        protected function autenticar(string $idUsuario, string $passw, bool $verificar = false) {

            $body = $this->ejecutar("/auth", 'PATCH', json_encode(['cedula' => $idUsuario, 'passw' => $passw]));

        return $body['status'] == 200 ? json_decode($body['body']) : false;
    }        
    }