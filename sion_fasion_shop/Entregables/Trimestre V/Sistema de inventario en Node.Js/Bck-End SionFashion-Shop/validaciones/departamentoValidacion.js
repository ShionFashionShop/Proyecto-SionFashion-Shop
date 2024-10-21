const Joi = require('joi');

const departamentoValidationSchema = Joi.object({
    nombre_departamento: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.max': 'El nombre del departamento no puede exceder los 255 caracteres.',
            'any.required': 'El nombre del departamento es obligatorio.'
        }),
    id_pais: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/) // Validación para un ObjectId de MongoDB
        .required()
        .messages({
            'string.pattern.base': 'El ID del país debe ser un ObjectId válido.',
            'any.required': 'El país es obligatorio.'
        }),
    ciudades: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID de la ciudad debe ser un ObjectId válido.'
    })
});

module.exports = departamentoValidationSchema;
