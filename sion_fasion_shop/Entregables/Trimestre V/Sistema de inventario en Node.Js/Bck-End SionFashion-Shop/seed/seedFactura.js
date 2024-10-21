const mongoose = require('mongoose');
const Factura = require('../models/factura'); // Ajusta la ruta según tu estructura
const Cliente = require('../models/cliente'); // Modelo de cliente
const MetodoDePago = require('../models/metodosDePago'); // Modelo de métodos de pago
const OrdenDeCompra = require('../models/ordenesDeCompra'); // Modelo de órdenes de compra
const Producto = require('../models/producto'); // Modelo de productos

// Semilla de Facturas
const facturasData = [
    {
        fecha_emision_factura: new Date('2024-01-01'),
        sub_total_factura: 100.00,
        impuesto_factura: 19.00,
        total_factura: 119.00,
        id_clienteNavigation: "Cliente_ID_1", // Cambiar por el ID correcto del cliente
        metodos_de_pagos: ["MetodoDePago_ID_1"], // Cambiar por los IDs correctos
        ordenes_de_compras: ["OrdenDeCompra_ID_1"], // Cambiar por los IDs correctos
        productos: ["Producto_ID_1", "Producto_ID_2"] // Cambiar por los IDs correctos
    },
    {
        fecha_emision_factura: new Date('2024-02-01'),
        sub_total_factura: 200.00,
        impuesto_factura: 38.00,
        total_factura: 238.00,
        id_clienteNavigation: "Cliente_ID_2",
        metodos_de_pagos: ["MetodoDePago_ID_2"],
        ordenes_de_compras: ["OrdenDeCompra_ID_2"],
        productos: ["Producto_ID_3"]
    }
];

async function seedFacturas() {
    console.log('Iniciando la siembra de facturas...');
    try {
        for (const facturaData of facturasData) {
            // Buscar si la factura ya existe por su fecha y cliente
            const facturaExistente = await Factura.findOne({ 
                fecha_emision_factura: facturaData.fecha_emision_factura, 
                id_clienteNavigation: facturaData.id_clienteNavigation 
            });
            console.log(`Buscando factura con fecha ${facturaData.fecha_emision_factura} para el cliente ${facturaData.id_clienteNavigation}...`);
            
            if (!facturaExistente) {
                // Buscar referencias de los modelos relacionados
                const cliente = await Cliente.findById(facturaData.id_clienteNavigation);
                const metodosDePago = await MetodoDePago.find({ _id: { $in: facturaData.metodos_de_pagos } });
                const ordenesDeCompra = await OrdenDeCompra.find({ _id: { $in: facturaData.ordenes_de_compras } });
                const productos = await Producto.find({ _id: { $in: facturaData.productos } });

                // Crear la nueva factura
                await Factura.create({
                    fecha_emision_factura: facturaData.fecha_emision_factura,
                    sub_total_factura: facturaData.sub_total_factura,
                    impuesto_factura: facturaData.impuesto_factura,
                    total_factura: facturaData.total_factura,
                    id_clienteNavigation: cliente._id,
                    metodos_de_pagos: metodosDePago.map(m => m._id),
                    ordenes_de_compras: ordenesDeCompra.map(o => o._id),
                    productos: productos.map(p => p._id)
                });
                console.log(`Factura creada para el cliente ${facturaData.id_clienteNavigation} con fecha ${facturaData.fecha_emision_factura}.`);
            } else {
                console.log(`Factura ya existe para el cliente ${facturaData.id_clienteNavigation} con fecha ${facturaData.fecha_emision_factura}.`);
            }
        }
        console.log('Semillas de facturas completadas.');
    } catch (err) {
        console.error('Error al crear semillas de facturas:', err);
    }
}

module.exports = seedFacturas;
