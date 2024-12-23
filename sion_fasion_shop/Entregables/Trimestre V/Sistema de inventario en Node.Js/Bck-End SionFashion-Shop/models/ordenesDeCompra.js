const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo OrdenesDeCompra
const ordenesDeCompraSchema = new Schema({
    id_cliente: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Cliente' // Asegúrate de tener el modelo "Cliente" definido
    },
    id_factura: {
        type: Schema.Types.ObjectId,
        ref: 'Factura' // Asegúrate de tener el modelo "Factura" definido
    },
    id_empleado: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado' // Asegúrate de tener el modelo "Empleado" definido
    },
    ordenes_productos: [{
        type: Schema.Types.ObjectId,
        ref: 'OrdenesProducto' // Asegúrate de tener el modelo "OrdenesProducto" definido
    }]
});

// Crea el modelo OrdenesDeCompra
const OrdenesDeCompra = mongoose.model('OrdenesDeCompra', ordenesDeCompraSchema);

module.exports = OrdenesDeCompra;
