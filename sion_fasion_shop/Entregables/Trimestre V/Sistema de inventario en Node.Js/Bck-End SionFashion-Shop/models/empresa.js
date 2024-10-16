const mongoose = require('mongoose');
const { Schema } = mongoose;

const empresaSchema = new Schema({

    nombre_empresa: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio.'],
        maxlength: [255, 'El nombre de la empresa no puede exceder los 255 caracteres.']
    },
    direccion_empresa: {
        type: String,
        maxlength: [255, 'La dirección no puede exceder los 255 caracteres.'],
        default: null
    },
    telefono_empresa: {
        type: String,
        maxlength: [255, 'El teléfono no puede exceder los 255 caracteres.'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Cambia esta expresión regular según el formato de teléfono que necesites
            },
            message: 'El número de teléfono no tiene un formato válido.'
        },
        default: null
    },
    email_empresa: {
        type: String,
        maxlength: [255, 'El correo electrónico no puede exceder los 255 caracteres.'],
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Cambia esta expresión regular según el formato de correo que necesites
            },
            message: 'El correo electrónico no tiene un formato válido.'
        },
        default: null
    },
    tienda: [{
        type: Schema.Types.ObjectId,
        ref: 'Tienda' // Asegúrate de que este sea el nombre correcto del modelo tienda
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Empresa', empresaSchema);
