### Módulo Adicional: Gestión de Inventario y Suministros
Se ha integrado un sistema de control de inventario que permite:
* **Catálogo de Piezas:** Registro de repuestos con código único, precio y niveles de stock.
* **Consumo Automatizado:** Vinculación de piezas a órdenes de reparación con actualización automática de existencias.
* **Cálculo de Costos Dinámico:** El costo total de la reparación se recalcula automáticamente sumando la mano de obra (diagnóstico) y el total de repuestos utilizados.
* **Integridad de Almacén:** Restricción mediante base de datos que impide asignar piezas si no hay existencias suficientes.