const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo HistorialInventario
const historialInventarioSchema = new Schema({
    id_historial_inventario: {
        type: Schema.Types.ObjectId,
        auto: true // Se generará automáticamente
    },
    id_producto: {
        type: Schema.Types.ObjectId,
        ref: 'producto', // Asegúrate de tener el modelo "Producto" definido
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 0 // Asegura que sea un número positivo
    },
    tipo_cambio: {
        type: String,
        required: true,
        maxlength: 10 // No puede exceder 10 caracteres
    },
    fecha_cambio: {
        type: Date,
        required: true
    }
});

// Crea el modelo HistorialInventario
const HistorialInventario = mongoose.model('HistorialInventario', historialInventarioSchema);

module.exports = HistorialInventario;
