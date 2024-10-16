const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Tienda
const tiendaSchema = new Schema({

    nombre_tienda: {
        type: String,
        required: [true, 'El nombre de la tienda es obligatorio.'],
        maxlength: [255, 'El nombre de la tienda no puede exceder los 255 caracteres.']
    },
    telefono_tienda: {
        type: String,
        maxlength: [255, 'El teléfono de la tienda no puede exceder los 255 caracteres.'],
        match: [/^\+?\d+$/, 'El teléfono de la tienda solo puede contener números positivos y el símbolo "+".']
    },
    ubicacion_tienda: {
        type: String,
        maxlength: [255, 'La ubicación de la tienda no puede exceder los 255 caracteres.']
    },
    id_ciudad: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de la ciudad es obligatorio.'],
        ref: 'Ciudade' // Asegúrate de tener el modelo "Ciudad" definido
    },
    id_empresa: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de la empresa es obligatorio.'],
        ref: 'Empresa' // Asegúrate de tener el modelo "Empresa" definido
    },
    empleados: [{
        type: Schema.Types.ObjectId,
        ref: 'Empleado' // Asegúrate de tener el modelo "Empleado" definido
    }],
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto' // Asegúrate de tener el modelo "Producto" definido
    }]
});

// Crea el modelo Tienda
const Tienda = mongoose.model('Tienda', tiendaSchema);

module.exports = Tienda;
