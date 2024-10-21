const Joi = require('joi');

// Esquema de validación para crear y actualizar ordenes de producto
const ordenesProductoSchema = Joi.object({
    id_orden_compra: Joi.string()
        .required()
        .messages({
            'string.empty': 'El campo id_orden_compra es obligatorio.',
            'any.required': 'El campo id_orden_compra es obligatorio.'
        }),
    id_producto: Joi.string()
        .required()
        .messages({
            'string.empty': 'El campo id_producto es obligatorio.',
            'any.required': 'El campo id_producto es obligatorio.'
        }),
    cantidad: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'La cantidad debe ser un número.',
            'number.integer': 'La cantidad debe ser un número entero.',
            'number.min': 'La cantidad debe ser mayor que cero.',
            'any.required': 'La cantidad es obligatoria.'
        })
});

// Exporta el esquema de validación
module.exports = {
    ordenesProductoSchema
};
