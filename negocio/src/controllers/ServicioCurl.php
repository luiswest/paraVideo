<?php
namespace App\controllers;

class ServicioCurl {
    private const URL = "http://web_datos/api";

    public function ejecutar($endpoint, $metodo, $datos = null) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, self::URL . $endpoint);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        if ($datos != null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
        }

        switch($metodo) {
            case 'POST':
                curl_setopt($ch, CURLOPT_POST, true);
                break;
            case 'PUT':
            case 'PATCH':
            case 'DELETE':
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $metodo);
        }
        
        
        $resp = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        return ['body' => $resp, 'status' => $status];
           
    }
}