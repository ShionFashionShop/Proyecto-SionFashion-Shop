const mongoose = require('mongoose');
const OrdenesDeCompra = require('../models/ordenesDeCompra'); // Ajusta la ruta según tu estructura
const Cliente = require('../models/cliente'); // Modelo de cliente
const Factura = require('../models/factura'); // Modelo de factura
const Empleado = require('../models/empleado'); // Modelo de empleado
const OrdenesProducto = require('../models/ordenesProducto'); // Modelo de órdenes de producto

// Semilla de Órdenes de Compra
const ordenesDeCompraData = [
    {
        id_cliente: "Cliente_ID_1", // Cambiar por el ID correcto del cliente
        id_factura: "Factura_ID_1", // Cambiar por el ID correcto de la factura
        id_empleado: "Empleado_ID_1", // Cambiar por el ID correcto del empleado
        ordenes_productos: ["Producto_ID_1", "Producto_ID_2"] // Cambiar por IDs correctos de productos
    },
    {
        id_cliente: "Cliente_ID_2", // Cambiar por el ID correcto del cliente
        id_factura: null, // Sin factura asociada
        id_empleado: "Empleado_ID_2", // Cambiar por el ID correcto del empleado
        ordenes_productos: ["Producto_ID_3"] // Cambiar por IDs correctos de productos
    }
];

async function seedOrdenesDeCompra() {
    console.log('Iniciando la siembra de órdenes de compra...');
    try {
        for (const orden of ordenesDeCompraData) {
            // Verificar si el cliente existe
            const cliente = await Cliente.findById(orden.id_cliente);
            if (!cliente) {
                console.log(`Cliente con ID ${orden.id_cliente} no encontrado. Se omitirá esta orden de compra.`);
                continue; // Salta al siguiente orden si el cliente no se encuentra
            }

            // Verificar si la factura existe, solo si se proporciona un ID
            if (orden.id_factura) {
                const factura = await Factura.findById(orden.id_factura);
                if (!factura) {
                    console.log(`Factura con ID ${orden.id_factura} no encontrada. Se omitirá esta orden de compra.`);
                    continue; // Salta al siguiente orden si la factura no se encuentra
                }
            }

            // Verificar si el empleado existe
            const empleado = await Empleado.findById(orden.id_empleado);
            if (!empleado) {
                console.log(`Empleado con ID ${orden.id_empleado} no encontrado. Se omitirá esta orden de compra.`);
                continue; // Salta al siguiente orden si el empleado no se encuentra
            }

            // Verificar si los productos existen
            const productosExistentes = await OrdenesProducto.find({_id: { $in: orden.ordenes_productos }});
            if (productosExistentes.length !== orden.ordenes_productos.length) {
                console.log(`Algunos productos no fueron encontrados para la orden de compra. Se omitirá esta orden.`);
                continue; // Salta al siguiente orden si hay productos no encontrados
            }

            // Crear el nuevo registro de orden de compra
            await OrdenesDeCompra.create({
                id_cliente: orden.id_cliente,
                id_factura: orden.id_factura || null, // Usar null si no hay factura asociada
                id_empleado: orden.id_empleado,
                ordenes_productos: orden.ordenes_productos
            });

            console.log(`Orden de compra creada para el cliente con ID ${orden.id_cliente}.`);
        }
        console.log('Semillas de órdenes de compra completadas.');
    } catch (err) {
        console.error('Error al crear semillas de órdenes de compra:', err);
    }
}

module.exports = seedOrdenesDeCompra;