const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteSchema = new Schema({

    nombre_cliente: {
        type: String,
        maxlength: [255, 'El nombre del cliente no puede exceder los 255 caracteres.'],
        default: null
    },
    email_cliente: {
        type: String,
        maxlength: [255, 'El correo electrónico no puede exceder los 255 caracteres.'],
        match: [/.+@.+\..+/, 'El correo electrónico no es válido.'], // Validación de formato de email
        default: null
    },
    telefono_cliente: {
        type: String,
        maxlength: [255, 'El número de teléfono no puede exceder los 255 caracteres.'],
        match: [/^\+?[0-9\s]+$/, 'El número de teléfono no es válido.'], // Validación de formato de teléfono
        default: null
    },
    direccion_cliente: {
        type: String,
        maxlength: [255, 'La dirección no puede exceder los 255 caracteres.'],
        default: null
    },
    facturas: [{
        type: Schema.Types.ObjectId,
        ref: 'Factura' // Asegúrate de que este sea el nombre correcto del modelo factura
    }],
    ordenes_de_compras: [{
        type: Schema.Types.ObjectId,
        ref: 'OrdenesDeCompra' // Asegúrate de que este sea el nombre correcto del modelo orden de compra
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Cliente', clienteSchema);
