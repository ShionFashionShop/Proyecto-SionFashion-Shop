const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoriaSchema = new Schema({
    id_categoria: {
        type: Number,
        required: true,
        unique: true
    },
    nombre_categoria: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio.'],
        maxlength: [100, 'El nombre de la categoría no puede exceder los 100 caracteres.']
    },
    sub_categoria: [{
        type: Schema.Types.ObjectId,
        ref: 'sub_categoria' // Asegúrate de que este sea el nombre correcto del modelo sub_categoria
    }]
});

// Exportar el modelo
module.exports = mongoose.model('Categoria', categoriaSchema);
