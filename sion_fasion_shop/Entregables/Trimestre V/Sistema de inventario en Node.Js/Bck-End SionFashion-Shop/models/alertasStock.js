const mongoose = require('mongoose');
const { Schema } = mongoose;

const alertasStockSchema = new Schema({
    id_alerta: {
        type: Number,
        required: true,
        unique: true
    },
    id_producto: {
        type: Number,
        required: [true, 'El id del producto es obligatorio.']
    },
    nivel_minimo: {
        type: Number,
        required: [true, 'El nivel mínimo es obligatorio.'],
        min: [0, 'El nivel mínimo debe ser un valor positivo.']
    },
    fecha_alerta: {
        type: Date,
        required: [true, 'La fecha de la alerta es obligatoria.'],
        validate: {
            validator: (v) => !isNaN(Date.parse(v)),
            message: 'Formato de fecha inválido.'
        }
    },
    id_productoNavigation: {
        type: Schema.Types.ObjectId,
        ref: 'producto' // Asegúrate de que este sea el nombre correcto del modelo producto
    }
});

// Exportar el modelo
module.exports = mongoose.model('AlertasStock', alertasStockSchema);
