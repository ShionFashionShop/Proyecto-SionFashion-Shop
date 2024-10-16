const mongoose = require('mongoose');
const { Schema } = mongoose;

const facturaSchema = new Schema({

    fecha_emision_factura: {
        type: Date,
        required: [true, 'La fecha de emisión es obligatoria.']
    },
    sub_total_factura: {
        type: Schema.Types.Decimal128,
        required: [true, 'El subtotal es obligatorio.'],
        min: [0, 'El subtotal debe estar entre 0 y 9999999999.99.'],
        max: [9999999999.99, 'El subtotal debe estar entre 0 y 9999999999.99.']
    },
    impuesto_factura: {
        type: Schema.Types.Decimal128,
        required: [true, 'El impuesto es obligatorio.'],
        min: [0, 'El impuesto debe estar entre 0 y 9999999999.99.'],
        max: [9999999999.99, 'El impuesto debe estar entre 0 y 9999999999.99.']
    },
    total_factura: {
        type: Schema.Types.Decimal128,
        required: [true, 'El total es obligatorio.'],
        min: [0, 'El total debe estar entre 0 y 9999999999.99.'],
        max: [9999999999.99, 'El total debe estar entre 0 y 9999999999.99.']
    },

    id_clienteNavigation: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente' // Asegúrate de que este sea el nombre correcto del modelo cliente
    },
    metodos_de_pagos: [{
        type: Schema.Types.ObjectId,
        ref: 'MetodosDePago' // Asegúrate de que este sea el nombre correcto del modelo métodos de pago
    }],
    ordenes_de_compras: [{
        type: Schema.Types.ObjectId,
        ref: 'OrdenesDeCompra' // Asegúrate de que este sea el nombre correcto del modelo órdenes de compra
    }],
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto' // Asegúrate de que este sea el nombre correcto del modelo producto
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Factura', facturaSchema);
