const Joi = require('joi');

const tiendaValidationSchema = Joi.object({
    nombre_tienda: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'El nombre de la tienda debe ser una cadena de texto.',
            'string.max': 'El nombre de la tienda no puede exceder los 255 caracteres.',
            'any.required': 'El nombre de la tienda es obligatorio.'
        }),
    telefono_tienda: Joi.string()
        .pattern(/^\+?\d+$/, 'números positivos y el símbolo "+"')
        .max(255)
        .messages({
            'string.base': 'El teléfono de la tienda debe ser una cadena de texto.',
            'string.max': 'El teléfono de la tienda no puede exceder los 255 caracteres.',
            'string.pattern.name': 'El teléfono de la tienda solo puede contener números y el símbolo "+".'
        }),
    ubicacion_tienda: Joi.string()
        .max(255)
        .optional()
        .messages({
            'string.base': 'La ubicación de la tienda debe ser una cadena de texto.',
            'string.max': 'La ubicación de la tienda no puede exceder los 255 caracteres.'
        }),
    id_ciudad: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'ID de MongoDB')
        .required()
        .messages({
            'string.pattern.name': 'El ID de la ciudad debe ser un ID de MongoDB válido.',
            'any.required': 'El ID de la ciudad es obligatorio.'
        }),
    id_empresa: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'ID de MongoDB')
        .required()
        .messages({
            'string.pattern.name': 'El ID de la empresa debe ser un ID de MongoDB válido.',
            'any.required': 'El ID de la empresa es obligatorio.'
        }),
    empleados: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de MongoDB'))
        .optional()
        .messages({
            'string.pattern.name': 'Cada ID de empleado debe ser un ID de MongoDB válido.'
        }),
    productos: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de MongoDB'))
        .optional()
        .messages({
            'string.pattern.name': 'Cada ID de producto debe ser un ID de MongoDB válido.'
        })
});

module.exports = { tiendaValidationSchema };
