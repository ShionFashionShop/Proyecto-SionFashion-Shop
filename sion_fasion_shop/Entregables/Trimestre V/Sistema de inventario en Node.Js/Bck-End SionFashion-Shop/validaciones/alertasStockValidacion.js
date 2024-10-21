const Joi = require('joi');

const alertasStockValidation = Joi.object({
    nivel_minimo: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'El nivel mínimo debe ser un número.',
            'number.min': 'El nivel mínimo debe ser un valor positivo.',
            'any.required': 'El nivel mínimo es obligatorio.'
        }),
    
    fecha_alerta: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha de la alerta debe ser una fecha válida.',
            'any.required': 'La fecha de la alerta es obligatoria.'
        }),
    
    id_productoNavigation: Joi.string()
        .required()
        .messages({
            'string.base': 'El ID del producto debe ser una cadena de texto.',
            'any.required': 'El ID del producto es obligatorio.'
        })
});

module.exports = alertasStockValidation;
