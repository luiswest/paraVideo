<?php
namespace App\validators;

class ClienteValidator
{
    public function validateCreate(object $data): array
    {
        $errors = [];

        if (empty($data->cedula)) {
            $errors['cedula'] = 'La cédula es requerida';
        } elseif (!preg_match('/^([1-9]\d{8}|5\d{11})$/', $data->cedula)) {
            $errors['cedula'] = 'La cédula debe tener 9 dígitos (nacional) o 12 dígitos (DIMEX)';
        }

        if (empty($data->nombre)) {
            $errors['nombre'] = 'El nombre es requerido';
        } else {
            $nombre = trim($data->nombre);
            if (strlen($nombre) < 2 || strlen($nombre) > 50) {
                $errors['nombre'] = 'El nombre debe tener entre 2 y 50 caracteres';
            } elseif (!preg_match('/^[A-Za-zÑñáéíóúÁÉÍÓÚ\s]+$/', $nombre)) {
                $errors['nombre'] = 'El nombre solo debe contener letras y espacios';
            }
        }

        if (empty($data->email)) {
            $errors['email'] = 'El email es requerido';
        } elseif (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'El email no es válido';
        }

        if (!empty($data->telefono) && !preg_match('/^[2-9]?\d{3}-\d{4}$/', $data->telefono)) {
            $errors['telefono'] = 'El teléfono debe tener formato XXXX-XXXX';
        }

        return $errors;
    }

    public function validateUpdate(object $data): array
    {
        $errors = [];

        if (isset($data->cedula) && !preg_match('/^([1-9]\d{8}|5\d{11})$/', $data->cedula)) {
            $errors['cedula'] = 'La cédula debe tener 9 dígitos (nacional) o 12 dígitos (DIMEX)';
        }

        if (isset($data->nombre)) {
            $nombre = trim($data->nombre);
            if (strlen($nombre) < 2 || strlen($nombre) > 50) {
                $errors['nombre'] = 'El nombre debe tener entre 2 y 50 caracteres';
            } elseif (!preg_match('/^[A-Za-zÑñáéíóúÁÉÍÓÚ\s]+$/', $nombre)) {
                $errors['nombre'] = 'El nombre solo debe contener letras y espacios';
            }
        }

        if (isset($data->email) && !filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'El email no es válido';
        }

        if (!empty($data->telefono) && !preg_match('/^[2-9]?\d{3}-\d{4}$/', $data->telefono)) {
            $errors['telefono'] = 'El teléfono debe tener formato XXXX-XXXX';
        }

        return $errors;
    }
}
