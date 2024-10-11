const mongoose = require('mongoose');
const { Schema } = mongoose;

const empleadoSchema = new Schema({
    id_empleado: {
        type: Number,
        required: true,
        unique: true
    },
    dni_empleado: {
        type: String,
        required: [true, 'El DNI del empleado es obligatorio.'],
        maxlength: [255, 'El DNI no puede exceder los 255 caracteres.'],
        unique: true // Para asegurarse de que el DNI sea único
    },
    nombres_empleado: {
        type: String,
        required: [true, 'El nombre del empleado es obligatorio.'],
        maxlength: [255, 'El nombre no puede exceder los 255 caracteres.']
    },
    apellidos_empleado: {
        type: String,
        required: [true, 'El apellido del empleado es obligatorio.'],
        maxlength: [255, 'El apellido no puede exceder los 255 caracteres.']
    },
    telefono_empleado: {
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
    email_empleado: {
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
    id_tienda: {
        type: Schema.Types.ObjectId,
        ref: 'tienda', // Asegúrate de que este sea el nombre correcto del modelo tienda
        default: null
    },
    id_ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'ciudade', // Asegúrate de que este sea el nombre correcto del modelo ciudad
        default: null
    },
    ordenes_de_compras: [{
        type: Schema.Types.ObjectId,
        ref: 'ordenesDeCompra' // Asegúrate de que este sea el nombre correcto del modelo ordenes_de_compra
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Empleado', empleadoSchema);
