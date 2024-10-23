const mongoose = require('mongoose');
const Factura = require('../models/factura'); // Ajusta la ruta según tu estructura

//const Cliente = require('../models/cliente'); // Modelo de cliente
//const MetodoDePago = require('../models/metodosDePago'); // Modelo de métodos de pago
//const OrdenDeCompra = require('../models/ordenesDeCompra'); // Modelo de órdenes de compra
//const Producto = require('../models/producto'); // Modelo de productos



// Semilla de Facturas (modificada sin referencias a otros modelos)
const facturasData = [
    {
        fecha_emision_factura: new Date('2024-01-01'),
        sub_total_factura: 100.00,
        impuesto_factura: 19.00,
        total_factura: 119.00,
        id_clienteNavigation: new mongoose.Types.ObjectId(), // ID temporal
        metodos_de_pagos: [new mongoose.Types.ObjectId()],   // ID temporal
        ordenes_de_compras: [new mongoose.Types.ObjectId()], // ID temporal
        productos: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] // ID temporal
    },
    {
        fecha_emision_factura: new Date('2024-02-01'),
        sub_total_factura: 200.00,
        impuesto_factura: 38.00,
        total_factura: 238.00,
        id_clienteNavigation: new mongoose.Types.ObjectId(), // ID temporal
        metodos_de_pagos: [new mongoose.Types.ObjectId()],   // ID temporal
        ordenes_de_compras: [new mongoose.Types.ObjectId()], // ID temporal
        productos: [new mongoose.Types.ObjectId()]           // ID temporal
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
            console.log(`Buscando factura con fecha ${facturaData.fecha_emision_factura}...`);
            
            if (!facturaExistente) {
                // Crear la nueva factura sin relaciones
                await Factura.create({
                    fecha_emision_factura: facturaData.fecha_emision_factura,
                    sub_total_factura: facturaData.sub_total_factura,
                    impuesto_factura: facturaData.impuesto_factura,
                    total_factura: facturaData.total_factura,
                    id_clienteNavigation: facturaData.id_clienteNavigation, // Temporal
                    metodos_de_pagos: facturaData.metodos_de_pagos,         // Temporal
                    ordenes_de_compras: facturaData.ordenes_de_compras,     // Temporal
                    productos: facturaData.productos                       // Temporal
                });
                console.log(`Factura creada con fecha ${facturaData.fecha_emision_factura}.`);
            } else {
                console.log(`Factura ya existe con fecha ${facturaData.fecha_emision_factura}.`);
            }
        }
        console.log('Semillas de facturas completadas.');
    } catch (err) {
        console.error('Error al crear semillas de facturas:', err);
    }
}

module.exports = seedFacturas;