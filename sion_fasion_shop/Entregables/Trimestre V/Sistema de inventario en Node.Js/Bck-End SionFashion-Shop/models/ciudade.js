const mongoose = require('mongoose');
const { Schema } = mongoose;

const ciudadeSchema = new Schema({
    id_ciudad: {
        type: Number,
        required: true,
        unique: true
    },
    nombre_ciudad: {
        type: String,
        required: [true, 'El nombre de la ciudad es obligatorio.'],
        maxlength: [100, 'El nombre de la ciudad no puede exceder los 100 caracteres.']
    },
    id_departamento: {
        type: Number,
        required: true
    },
    empleados: [{
        type: Schema.Types.ObjectId,
        ref: 'empleado' // Asegúrate de que este sea el nombre correcto del modelo empleado
    }],
    id_departamentoNavigation: {
        type: Schema.Types.ObjectId,
        ref: 'departamento' // Asegúrate de que este sea el nombre correcto del modelo departamento
    },
    proveedores: [{
        type: Schema.Types.ObjectId,
        ref: 'proveedor' // Asegúrate de que este sea el nombre correcto del modelo proveedor
    }],
    tienda: [{
        type: Schema.Types.ObjectId,
        ref: 'tienda' // Asegúrate de que este sea el nombre correcto del modelo tienda
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Ciudade', ciudadeSchema);
