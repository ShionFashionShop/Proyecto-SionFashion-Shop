const mongoose = require('mongoose');
const Factura = require('../models/factura'); // Ajusta la ruta según tu estructura

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
            // Buscar si la factura ya existe por los 4 criterios: fecha, subtotal, impuesto y total
            const facturaExistente = await Factura.findOne({ 
                fecha_emision_factura: facturaData.fecha_emision_factura, 
                sub_total_factura: facturaData.sub_total_factura,
                impuesto_factura: facturaData.impuesto_factura,
                total_factura: facturaData.total_factura
            });

            if (!facturaExistente) {
                // Crear la nueva factura solo si no existe
                await Factura.create(facturaData);
                console.log(`Factura creada con fecha ${facturaData.fecha_emision_factura} y total ${facturaData.total_factura}.`);
            } else {
                console.log(`Factura ya existe con fecha ${facturaData.fecha_emision_factura}, subtotal ${facturaData.sub_total_factura}, impuesto ${facturaData.impuesto_factura}, y total ${facturaData.total_factura}.`);
            }
        }
        console.log('Semillas de facturas completadas.');
    } catch (err) {
        console.error('Error al crear semillas de facturas:', err);
    }
}

module.exports = seedFacturas;
