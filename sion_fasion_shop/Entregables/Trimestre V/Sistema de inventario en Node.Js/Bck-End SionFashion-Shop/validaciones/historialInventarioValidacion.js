const Joi = require('joi');

// Esquema de validación de Joi para HistorialInventario
const historialInventarioSchema = Joi.object({
    id_producto: Joi.string()
        .length(24) // Longitud de ObjectId
        .required()
        .messages({
            'string.base': 'El ID del producto debe ser un texto.',
            'string.length': 'El ID del producto debe tener 24 caracteres.',
            'any.required': 'El ID del producto es obligatorio.'
        }),
    cantidad: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'La cantidad debe ser un número.',
            'number.integer': 'La cantidad debe ser un número entero.',
            'number.min': 'La cantidad debe ser un número positivo.',
            'any.required': 'La cantidad es obligatoria.'
        }),
    tipo_cambio: Joi.string()
        .max(10)
        .required()
        .messages({
            'string.base': 'El tipo de cambio debe ser un texto.',
            'string.max': 'El tipo de cambio no puede exceder 10 caracteres.',
            'any.required': 'El tipo de cambio es obligatorio.'
        }),
    fecha_cambio: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha de cambio debe ser una fecha válida.',
            'any.required': 'La fecha de cambio es obligatoria.'
        })
});

module.exports = historialInventarioSchema;
