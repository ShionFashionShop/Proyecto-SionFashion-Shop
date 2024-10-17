const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema del modelo Producto
const productoSchema = new Schema({
    nombre_producto: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio.'],
        maxlength: [255, 'El nombre del producto no puede exceder los 255 caracteres.']
    },
    descripcion_producto: {
        type: String,
        maxlength: [255, 'La descripción del producto no puede exceder los 255 caracteres.']
    },
    precio_producto: {
        type: Schema.Types.Decimal128,
        required: [true, 'El precio del producto es obligatorio.'],
        min: [0.01, 'El precio del producto debe ser mayor que cero.']
    },
    unidad_medida: {
        type: String,
        maxlength: [10, 'La unidad de medida no puede exceder los 4 caracteres.']
    },
    peso_del_producto: {
        type: String,
        maxlength: [255, 'El peso del producto no puede exceder los 255 caracteres.']
    },
    ubicacion_producto: {
        type: String,
        maxlength: [255, 'La ubicación del producto no puede exceder los 255 caracteres.']
    },
    id_sub_categoria: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategoria', // Asegúrate de tener el modelo "SubCategoria" definido
        required: [true, 'La subcategoría es obligatoria.']
    },
    id_proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor', // Asegúrate de tener el modelo "Proveedor" definido
        required: [true, 'El proveedor es obligatorio.']
    },
    id_tienda: {
        type: Schema.Types.ObjectId,
        ref: 'Tienda', // Asegúrate de tener el modelo "Tienda" definido
        required: [true, 'La tienda es obligatoria.']
    },
    id_factura: {
        type: Schema.Types.ObjectId,
        ref: 'Factura' // Asegúrate de tener el modelo "Factura" definido
    }
});

// Crea el modelo Producto
const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
