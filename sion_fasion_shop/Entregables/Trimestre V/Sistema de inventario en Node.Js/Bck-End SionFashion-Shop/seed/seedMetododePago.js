const mongoose = require('mongoose');
const MetodosDePago = require('../models/metodosDePago'); // Ajusta la ruta según tu estructura
const Factura = require('../models/factura'); // Modelo de factura

// Semilla de Métodos de Pago con ObjectId temporal
const metodosDePagoData = [
    {
        metodo_pago: "Tarjeta de Crédito",
        id_factura: new mongoose.Types.ObjectId() // ID temporal
    },
    {
        metodo_pago: "Efectivo",
        id_factura: new mongoose.Types.ObjectId() // ID temporal
    },
    {
        metodo_pago: "Transferencia Bancaria",
        id_factura: null // Sin factura asociada
    }
];

async function seedMetodosDePago() {
    console.log('Iniciando la siembra de métodos de pago...');
    try {
        for (const metodo of metodosDePagoData) {
            // Verificar si la factura existe, solo si se proporciona un ID de factura
            if (metodo.id_factura) {
                const factura = await Factura.findById(metodo.id_factura);
                if (!factura) {
                    console.log(`Factura con ID ${metodo.id_factura} no encontrada. Se omitirá este método de pago.`);
                    continue; // Salta al siguiente método si la factura no se encuentra
                }
            }

            // Crear el nuevo registro de método de pago
            await MetodosDePago.create({
                metodo_pago: metodo.metodo_pago,
                id_factura: metodo.id_factura || null // Usar null si no hay factura asociada
            });

            console.log(`Método de pago '${metodo.metodo_pago}' creado.`);
        }
        console.log('Semillas de métodos de pago completadas.');
    } catch (err) {
        console.error('Error al crear semillas de métodos de pago:', err);
    }
}

module.exports = seedMetodosDePago;
