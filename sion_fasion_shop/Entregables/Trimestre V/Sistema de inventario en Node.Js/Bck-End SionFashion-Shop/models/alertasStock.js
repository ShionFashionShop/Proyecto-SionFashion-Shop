const mongoose = require('mongoose');
const { Schema } = mongoose;
const Producto = require('../models/producto');  // Asegúrate de ajustar la ruta según tu estructura


const alertasStockSchema = new Schema({
    nivel_minimo: {
        type: Number,
        required: [true, 'El nivel mínimo es obligatorio.'],
        min: [0, 'El nivel mínimo debe ser un valor positivo.']
    },
    fecha_alerta: {
        type: Date,
        required: [true, 'La fecha de la alerta es obligatoria.'],
        
    },
    id_productoNavigation: {
        type: Schema.Types.ObjectId,
        ref: 'Producto' // Asegúrate de que este sea el nombre correcto del modelo producto
    }
});

// Exportar el modelo
module.exports = mongoose.model('AlertasStock', alertasStockSchema);
