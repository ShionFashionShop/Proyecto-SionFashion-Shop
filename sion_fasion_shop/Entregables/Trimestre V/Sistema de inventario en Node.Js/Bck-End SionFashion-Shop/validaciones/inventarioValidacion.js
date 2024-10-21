const Joi = require('joi');

// Esquema de validación de Joi para Inventario
const inventarioSchema = Joi.object({
    id_producto: Joi.string()
        .length(24) // Longitud de ObjectId
        .required()
        .messages({
            'string.base': 'El ID del producto debe ser un texto.',
            'string.length': 'El ID del producto debe tener 24 caracteres.',
            'any.required': 'El ID del producto es obligatorio.'
        }),
    stock_inicial: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El stock inicial debe ser un número.',
            'number.integer': 'El stock inicial debe ser un número entero.',
            'number.min': 'El stock inicial debe ser un número positivo.',
            'any.required': 'El stock inicial es obligatorio.'
        }),
    stock_actual: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El stock actual debe ser un número.',
            'number.integer': 'El stock actual debe ser un número entero.',
            'number.min': 'El stock actual debe ser un número positivo.',
            'any.required': 'El stock actual es obligatorio.'
        }),
    saldo: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'El saldo debe ser un número.',
            'number.integer': 'El saldo debe ser un número entero.',
            'number.min': 'El saldo debe ser un número positivo.',
            'any.required': 'El saldo es obligatorio.'
        })
});

module.exports = inventarioSchema;
