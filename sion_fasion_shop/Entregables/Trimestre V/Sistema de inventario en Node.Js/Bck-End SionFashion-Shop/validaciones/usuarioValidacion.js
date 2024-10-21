// validations/usuarioValidation.js
const Joi = require('joi');

const usuarioValidationSchema = Joi.object({
    nombre_usuario: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'El nombre de usuario debe ser un texto.',
            'string.empty': 'El nombre de usuario es obligatorio.',
            'string.max': 'El nombre de usuario no puede exceder los 255 caracteres.'
        }),
    clave_usuario: Joi.string()
        .min(8)
        .max(255)
        .required()
        .messages({
            'string.base': 'La clave de usuario debe ser un texto.',
            'string.empty': 'La clave de usuario es obligatoria.',
            'string.min': 'La clave de usuario debe tener al menos 8 caracteres.',
            'string.max': 'La clave de usuario no puede exceder los 255 caracteres.'
        }),
    roles: Joi.array()
        .items(Joi.string().required())
        .min(1) // Asegura que al menos un rol esté presente
        .required()
        .messages({
            'array.base': 'Los roles deben ser un arreglo.',
            'array.empty': 'Los roles son obligatorios.',
            'array.min': 'Al menos un rol es obligatorio.',
            'string.empty': 'El ID de rol es obligatorio.'
        }),
    registros_actividades: Joi.array()
        .items(Joi.string().optional()) // Puedes ajustar esto según sea necesario
        .optional()
        .messages({
            'array.base': 'Los registros de actividades deben ser un arreglo.'
        })
});

// Exporta el esquema de validación
module.exports = { usuarioValidationSchema };
