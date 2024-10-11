const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Proveedor
const proveedorSchema = new Schema({
    id_proveedor: {
        type: Number,
        required: [true, 'El ID del proveedor es obligatorio.'],
        unique: true, // Asegura que cada proveedor tenga un ID único
    },
    nombre_proveedor: {
        type: String,
        required: [true, 'El nombre del proveedor es obligatorio.'],
        maxlength: [255, 'El nombre del proveedor no puede exceder los 255 caracteres.']
    },
    contacto_proveedor: {
        type: String,
        maxlength: [255, 'El contacto del proveedor no puede exceder los 255 caracteres.']
    },
    email_proveedor: {
        type: String,
        maxlength: [255, 'El email del proveedor no puede exceder los 255 caracteres.'],
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validación simple de email
            },
            message: props => `${props.value} no es un email válido.`
        }
    },
    id_ciudad: {
        type: Schema.Types.ObjectId,
        ref: 'ciudade', // Asegúrate de que el modelo "ciudade" esté definido
        default: null // Permite que sea nulo si no hay una ciudad asociada
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'producto' // Asegúrate de que el modelo "producto" esté definido
    }]
});

// Crea el modelo Proveedor
const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;
