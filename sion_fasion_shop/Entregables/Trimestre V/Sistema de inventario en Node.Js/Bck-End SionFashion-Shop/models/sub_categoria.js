const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo SubCategoria
const subCategoriaSchema = new Schema({
    nombre_sub_categoria: {
        type: String,
        required: [true, 'El nombre de la subcategoría es obligatorio.'],
        maxlength: [255, 'El nombre de la subcategoría no puede exceder los 255 caracteres.']
    },
    id_categoria: {
        type: Schema.Types.ObjectId,
        required: [true, 'El ID de la categoría es obligatorio.'],
        ref: 'categoria' // Asegúrate de tener el modelo "Categoria" definido
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'producto' // Asegúrate de tener el modelo "Producto" definido
    }]
});

// Crea el modelo SubCategoria
const SubCategoria = mongoose.model('SubCategoria', subCategoriaSchema);

module.exports = SubCategoria;
