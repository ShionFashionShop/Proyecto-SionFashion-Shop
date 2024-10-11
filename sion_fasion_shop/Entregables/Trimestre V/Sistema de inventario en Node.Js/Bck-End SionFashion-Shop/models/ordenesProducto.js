const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo OrdenesProducto
const ordenesProductoSchema = new Schema({
    id_orden_compra: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ordenesDeCompra' // Asegúrate de tener el modelo "OrdenesDeCompra" definido
    },
    id_producto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'producto' // Asegúrate de tener el modelo "Producto" definido
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria.'],
        min: [1, 'La cantidad debe ser mayor que cero.']
    }
});

// Crea el modelo OrdenesProducto
const OrdenesProducto = mongoose.model('OrdenesProducto', ordenesProductoSchema);

module.exports = OrdenesProducto;
