const mongoose = require('mongoose');
const { Schema } = mongoose;

const metodosDePagoSchema = new Schema({
    // Este campo se genera automáticamente
    // El id_metodo_pago no necesita ser declarado explícitamente en el esquema
    metodo_pago: {
        type: String,
        required: [true, 'El método de pago es obligatorio.'],
        maxlength: [50, 'El método de pago no puede exceder los 50 caracteres.']
    },
    id_factura: {
        type: Schema.Types.ObjectId,
        ref: 'Factura', // Asegúrate de que el modelo "Factura" esté definido
        default: null // Permite que sea nulo si no hay una factura asociada
    }
});

// Crea el modelo MetodosDePago
const MetodosDePago = mongoose.model('MetodosDePago', metodosDePagoSchema);

module.exports = MetodosDePago;
