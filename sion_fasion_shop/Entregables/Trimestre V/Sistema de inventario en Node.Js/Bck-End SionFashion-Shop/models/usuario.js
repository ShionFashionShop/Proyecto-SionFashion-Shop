const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Usuario
const usuarioSchema = new Schema({
    nombre_usuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio.'],
        maxlength: [255, 'El nombre de usuario no puede exceder los 255 caracteres.']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un email válido.'] // Validación para el email
    },
    clave_usuario: {
        type: String,
        required: [true, 'La clave de usuario es obligatoria.'],
        minlength: [8, 'La clave de usuario debe tener al menos 8 caracteres.'],
        maxlength: [255, 'La clave de usuario no puede exceder los 255 caracteres.']
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role', // Referencia al modelo de "Role"
        required: [true, 'El ID de rol es obligatorio.']
    }],
    registros_actividades: [{
        type: Schema.Types.ObjectId,
        ref: 'RegistroActividad' // Referencia al modelo de "RegistroActividad"
    }]
}, {
    timestamps: true // Añade automáticamente las marcas de tiempo createdAt y updatedAt
});

// Método para comparar contraseñas durante el inicio de sesión
// Este método ahora compara la contraseña en texto plano directamente
usuarioSchema.methods.comparePassword = function (password) {
    return password === this.clave_usuario; // Compara directamente
};

// Crea el modelo Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
