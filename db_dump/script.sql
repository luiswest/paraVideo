-- Creación de la base de datos
-- CREATE DATABASE IF NOT EXISTS taller_automotriz;
USE taller_automotriz;

-- 1. Tabla de Clientes
-- Nota: Se incluye 'cedula' para identificación oficial
CREATE TABLE Clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100)
);

-- 2. Tabla de Vehículos
-- La placa actúa como identificador natural, pero usamos id_vehiculo para consistencia
CREATE TABLE Vehiculos (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(15) UNIQUE NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    anio INT,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE
);

-- 3. Tabla de Mecánicos
CREATE TABLE Mecanicos (
    id_mecanico INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(15) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(50)
);

-- 4. Tabla de Órdenes de Reparación
-- Controla el flujo principal y el estado actual
CREATE TABLE OrdenesReparacion (
    id_orden INT AUTO_INCREMENT PRIMARY KEY,
    fecha_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM(
        'INGRESADO', 
        'EN_DIAGNOSTICO', 
        'ESPERANDO_APROBACION', 
        'EN_REPARACION', 
        'LISTO_PARA_ENTREGA', 
        'ENTREGADO'
    ) DEFAULT 'INGRESADO',
    costo_total DECIMAL(12, 2) DEFAULT 0.00,
    id_vehiculo INT,
    id_mecanico INT,
    FOREIGN KEY (id_vehiculo) REFERENCES Vehiculos(id_vehiculo),
    FOREIGN KEY (id_mecanico) REFERENCES Mecanicos(id_mecanico)
);

-- 5. Tabla de Diagnósticos
-- Relación 1:1 con la Orden de Reparación
CREATE TABLE Diagnosticos (
    id_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
    id_orden INT UNIQUE,
    descripcion TEXT NOT NULL,
    observaciones TEXT,
    presupuesto_estimado DECIMAL(12, 2),
    FOREIGN KEY (id_orden) REFERENCES OrdenesReparacion(id_orden) ON DELETE CASCADE
);

-- 6 . Tabla de Administradores
CREATE TABLE Administradores (
    id_Administrador INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);

-- 7 . Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(15) UNIQUE,
    passw VARCHAR(255),
    rol INT,
    ultimo_acceso DATETIME,
    tkRef VARCHAR(255)
);

-- Insertar un cliente de prueba

-- INSERT INTO Clientes (cedula, nombre, telefono, email) 
-- VALUES 
-- ('1-1234-5678', 'Juan Pérez', '8888-7777', 'juan.perez@email.com'),
-- ('7-1234-5678', 'Luis West', '8888-7777', 'luis.west@email.com'),
-- ('6-1234-5678', 'Arguedas Pérez', '8888-7777', 'arguedas.perez@email.com'),
-- ('7-1234-5679', 'Lulehiska West', '8888-7777', 'lulu.west@email.com');



-- Insertar un vehículo
-- INSERT INTO Vehiculos (placa, marca, modelo, anio, id_cliente) 
-- VALUES ('BZC-123', 'Toyota', 'Corolla', 2022, 1);

-- Registrar un mecánico
-- INSERT INTO Mecanicos (cedula, nombre, especialidad) 
-- VALUES ('7-1234-6666','Carlos Solís', 'Motores y Transmisión');