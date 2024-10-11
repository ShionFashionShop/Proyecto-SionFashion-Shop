const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Role
const roleSchema = new Schema({
    nombre_rol: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio.'],
        maxlength: [255, 'El nombre del rol no puede exceder los 255 caracteres.']
    },
    descripcion_rol: {
        type: String,
        maxlength: [500, 'La descripción del rol no puede exceder los 500 caracteres.']
    },
    usuarios: [{
        type: Schema.Types.ObjectId,
        ref: 'usuario' // Asegúrate de tener el modelo "Usuario" definido
    }]
});

// Crea el modelo Role
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
