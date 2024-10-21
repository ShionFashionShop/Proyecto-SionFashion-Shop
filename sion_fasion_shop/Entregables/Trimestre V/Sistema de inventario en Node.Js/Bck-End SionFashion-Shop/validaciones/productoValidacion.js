const Joi = require('joi');

// Esquema de validación para el modelo Producto
const productoSchema = Joi.object({
    nombre_producto: Joi.string()
        .required()
        .max(255)
        .messages({
            'string.base': 'El nombre del producto debe ser una cadena.',
            'string.empty': 'El nombre del producto es obligatorio.',
            'string.max': 'El nombre del producto no puede exceder los 255 caracteres.'
        }),
    descripcion_producto: Joi.string()
        .max(255)
        .messages({
            'string.base': 'La descripción del producto debe ser una cadena.',
            'string.max': 'La descripción del producto no puede exceder los 255 caracteres.'
        }),
    precio_producto: Joi.number()
        .required()
        .min(0.01)
        .messages({
            'number.base': 'El precio del producto debe ser un número.',
            'number.empty': 'El precio del producto es obligatorio.',
            'number.min': 'El precio del producto debe ser mayor que cero.'
        }),
    unidad_medida: Joi.string()
        .max(10)
        .messages({
            'string.base': 'La unidad de medida debe ser una cadena.',
            'string.max': 'La unidad de medida no puede exceder los 10 caracteres.'
        }),
    peso_del_producto: Joi.string()
        .max(255)
        .messages({
            'string.base': 'El peso del producto debe ser una cadena.',
            'string.max': 'El peso del producto no puede exceder los 255 caracteres.'
        }),
    ubicacion_producto: Joi.string()
        .max(255)
        .messages({
            'string.base': 'La ubicación del producto debe ser una cadena.',
            'string.max': 'La ubicación del producto no puede exceder los 255 caracteres.'
        }),
    id_sub_categoria: Joi.string().hex().length(24)
        .required()
        .messages({
            'string.base': 'El ID de subcategoría debe ser un ObjectId válido.',
            'string.empty': 'La subcategoría es obligatoria.',
            'string.hex': 'El ID de subcategoría debe ser un ObjectId válido.',
            'string.length': 'El ID de subcategoría debe tener 24 caracteres.'
        }),
    id_proveedor: Joi.string().hex().length(24)
        .required()
        .messages({
            'string.base': 'El ID del proveedor debe ser un ObjectId válido.',
            'string.empty': 'El proveedor es obligatorio.',
            'string.hex': 'El ID del proveedor debe ser un ObjectId válido.',
            'string.length': 'El ID del proveedor debe tener 24 caracteres.'
        }),
    id_tienda: Joi.string().hex().length(24)
        .required()
        .messages({
            'string.base': 'El ID de la tienda debe ser un ObjectId válido.',
            'string.empty': 'La tienda es obligatoria.',
            'string.hex': 'El ID de la tienda debe ser un ObjectId válido.',
            'string.length': 'El ID de la tienda debe tener 24 caracteres.'
        }),
    id_factura: Joi.string().hex().length(24)
        .optional()
        .messages({
            'string.base': 'El ID de la factura debe ser un ObjectId válido.',
            'string.hex': 'El ID de la factura debe ser un ObjectId válido.',
            'string.length': 'El ID de la factura debe tener 24 caracteres.'
        })
});

// Exportar el esquema de validación
module.exports = { productoSchema };
