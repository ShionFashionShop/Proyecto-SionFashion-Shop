const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Usuario
const usuarioSchema = new Schema({
    nombre_usuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio.'],
        maxlength: [255, 'El nombre de usuario no puede exceder los 255 caracteres.']
    },
    clave_usuario: {
        type: String,
        required: [true, 'La clave de usuario es obligatoria.'],
        minlength: [8, 'La clave de usuario debe tener al menos 8 caracteres.'],
        maxlength: [255, 'La clave de usuario no puede exceder los 255 caracteres.']
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role', // Asegúrate de tener el modelo "Rol" definido
        required: [true, 'El ID de rol es obligatorio.']
    }],
    registros_actividades: [{
        type: Schema.Types.ObjectId,
        ref: 'RegistroActividad' // Asegúrate de tener el modelo "RegistrosActividad" definido
    }]
});

// Crea el modelo Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
