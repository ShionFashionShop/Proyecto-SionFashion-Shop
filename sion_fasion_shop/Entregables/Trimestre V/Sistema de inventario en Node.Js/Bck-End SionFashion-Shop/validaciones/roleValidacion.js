// validations/roleValidation.js
const Joi = require('joi');

const roleValidationSchema = Joi.object({
    nombre_rol: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'El nombre del rol debe ser un texto.',
            'string.empty': 'El nombre del rol es obligatorio.',
            'string.max': 'El nombre del rol no puede exceder los 255 caracteres.'
        }),
    descripcion_rol: Joi.string()
        .max(500)
        .optional()
        .messages({
            'string.base': 'La descripción del rol debe ser un texto.',
            'string.max': 'La descripción del rol no puede exceder los 500 caracteres.'
        }),
    usuarios: Joi.array()
        .items(Joi.string().length(24)) // Validar que los IDs sean cadenas de 24 caracteres
        .optional()
        .messages({
            'array.base': 'Los usuarios deben ser un arreglo.',
            'string.length': 'Los IDs de usuario deben tener 24 caracteres.'
        })
});

module.exports = { roleValidationSchema };
