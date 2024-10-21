const mongoose = require('mongoose');
const OrdenesProducto = require('../models/ordenesProducto'); // Ajusta la ruta según tu estructura
const OrdenesDeCompra = require('../models/ordenesDeCompra'); // Modelo de órdenes de compra
const Producto = require('../models/producto'); // Modelo de productos

// Semilla de Órdenes de Producto
const ordenesProductoData = [
    {
        id_orden_compra: "OrdenCompra_ID_1", // Cambiar por el ID correcto de la orden de compra
        id_producto: "Producto_ID_1", // Cambiar por el ID correcto del producto
        cantidad: 5 // Cambiar por la cantidad deseada
    },
    {
        id_orden_compra: "OrdenCompra_ID_2", // Cambiar por el ID correcto de la orden de compra
        id_producto: "Producto_ID_2", // Cambiar por el ID correcto del producto
        cantidad: 10 // Cambiar por la cantidad deseada
    }
];

async function seedOrdenesProducto() {
    console.log('Iniciando la siembra de órdenes de producto...');
    try {
        for (const ordenProducto of ordenesProductoData) {
            // Verificar si la orden de compra existe
            const ordenCompra = await OrdenesDeCompra.findById(ordenProducto.id_orden_compra);
            if (!ordenCompra) {
                console.log(`Orden de compra con ID ${ordenProducto.id_orden_compra} no encontrada. Se omitirá este producto.`);
                continue; // Salta al siguiente producto si la orden de compra no se encuentra
            }

            // Verificar si el producto existe
            const producto = await Producto.findById(ordenProducto.id_producto);
            if (!producto) {
                console.log(`Producto con ID ${ordenProducto.id_producto} no encontrado. Se omitirá este producto.`);
                continue; // Salta al siguiente producto si no se encuentra
            }

            // Crear el nuevo registro de orden de producto
            await OrdenesProducto.create({
                id_orden_compra: ordenProducto.id_orden_compra,
                id_producto: ordenProducto.id_producto,
                cantidad: ordenProducto.cantidad
            });

            console.log(`Orden de producto creada para la orden de compra con ID ${ordenProducto.id_orden_compra}.`);
        }
        console.log('Semillas de órdenes de producto completadas.');
    } catch (err) {
        console.error('Error al crear semillas de órdenes de producto:', err);
    }
}

module.exports = seedOrdenesProducto;