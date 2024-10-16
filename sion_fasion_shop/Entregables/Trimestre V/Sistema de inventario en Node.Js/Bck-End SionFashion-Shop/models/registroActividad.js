const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo RegistroActividad
const registroActividadSchema = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', // Asegúrate de tener el modelo "Usuario" definido
        required: true
    },
    actividad: {
        type: String,
        required: [true, 'La actividad es obligatoria.'],
        maxlength: [500, 'La actividad no puede exceder los 500 caracteres.']
    },
    fecha_actividad: {
        type: Date,
        required: true,
        validate: {
            validator: (v) => !isNaN(Date.parse(v)),
            message: 'Formato de fecha inválido.'
        }
    }
});

// Crea el modelo RegistroActividad
const RegistroActividad = mongoose.model('RegistroActividad', registroActividadSchema);

module.exports = RegistroActividad;
