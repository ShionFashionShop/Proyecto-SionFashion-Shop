const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Inventario
const inventarioSchema = new Schema({
    id_producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto', // Asegúrate de tener el modelo "Producto" definido
        required: true
    },
    stock_inicial: {
        type: Number,
        required: true,
        min: 0 // Asegura que sea un número positivo
    },
    stock_actual: {
        type: Number,
        required: true,
        min: 0 // Asegura que sea un número positivo
    },
    saldo: {
        type: Number,
        required: true,
        min: 0 // Asegura que sea un número positivo
    }
});

// Crea el modelo Inventario
const Inventario = mongoose.model('Inventario', inventarioSchema);

module.exports = Inventario;
