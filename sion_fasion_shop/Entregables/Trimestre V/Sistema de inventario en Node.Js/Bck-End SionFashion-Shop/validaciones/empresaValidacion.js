const Joi = require('joi');

// Definimos el esquema de validación con Joi
const empresaSchemaJoi = Joi.object({
    nombre_empresa: Joi.string().max(255).required().messages({
        'string.base': 'El nombre de la empresa debe ser un texto.',
        'string.max': 'El nombre de la empresa no puede exceder los 255 caracteres.',
        'any.required': 'El nombre de la empresa es obligatorio.'
    }),
    direccion_empresa: Joi.string().max(255).allow(null, '').messages({
        'string.base': 'La dirección debe ser un texto.',
        'string.max': 'La dirección no puede exceder los 255 caracteres.'
    }),
    telefono_empresa: Joi.string().pattern(/^\d{10}$/).allow(null, '').messages({
        'string.pattern.base': 'El número de teléfono debe tener 10 dígitos.'
    }),
    email_empresa: Joi.string().email().max(255).allow(null, '').messages({
        'string.email': 'El correo electrónico no tiene un formato válido.',
        'string.max': 'El correo electrónico no puede exceder los 255 caracteres.'
    }),
    tienda: Joi.array().items(Joi.string().hex().length(24)).messages({
        'string.hex': 'El ID de la tienda debe ser un ObjectId válido.'
    })
});

module.exports = empresaSchemaJoi;
