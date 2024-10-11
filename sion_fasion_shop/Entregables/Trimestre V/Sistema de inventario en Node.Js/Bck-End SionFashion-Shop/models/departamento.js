const mongoose = require('mongoose');
const { Schema } = mongoose;

const departamentoSchema = new Schema({
    id_departamento: {
        type: Number,
        required: true,
        unique: true
    },
    nombre_departamento: {
        type: String,
        required: [true, 'El nombre del departamento es obligatorio.'],
        maxlength: [255, 'El nombre del departamento no puede exceder los 255 caracteres.']
    },
    id_pais: {
        type: Schema.Types.ObjectId,
        ref: 'paise', // Asegúrate de que este sea el nombre correcto del modelo pais
        required: [true, 'El país es obligatorio.']
    },
    ciudades: [{
        type: Schema.Types.ObjectId,
        ref: 'ciudade' // Asegúrate de que este sea el nombre correcto del modelo ciudad
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Departamento', departamentoSchema);
