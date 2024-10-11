const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Paise
const paiseSchema = new Schema({
    nombre_pais: {
        type: String,
        required: [true, 'El nombre del país es obligatorio.'],
        maxlength: [255, 'El nombre del país no puede exceder los 255 caracteres.']
    },
    departamentos: [{
        type: Schema.Types.ObjectId,
        ref: 'departamento' // Asegúrate de tener el modelo "Departamento" definido
    }]
});

// Crea el modelo Paise
const Paise = mongoose.model('Paise', paiseSchema);

module.exports = Paise;
