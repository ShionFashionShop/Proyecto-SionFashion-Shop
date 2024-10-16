const mongoose = require('mongoose');
const { Schema } = mongoose;

const ciudadeSchema = new Schema({
    
    nombre_ciudad: {
        type: String,
        required: [true, 'El nombre de la ciudad es obligatorio.'],
        maxlength: [100, 'El nombre de la ciudad no puede exceder los 100 caracteres.']
    },
    
    empleados: [{
        type: Schema.Types.ObjectId,
        ref: 'Empleado' // Asegúrate de que este sea el nombre correcto del modelo empleado
    }],
    id_departamentoNavigation: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento' // Asegúrate de que este sea el nombre correcto del modelo departamento
    },
    proveedores: [{
        type: Schema.Types.ObjectId,
        ref: 'Proveedor' // Asegúrate de que este sea el nombre correcto del modelo proveedor
    }],
    tienda: [{
        type: Schema.Types.ObjectId,
        ref: 'Tienda' // Asegúrate de que este sea el nombre correcto del modelo tienda
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Ciudade', ciudadeSchema);
