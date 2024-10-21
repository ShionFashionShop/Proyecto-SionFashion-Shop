// validations/registroActividadValidation.js
const Joi = require('joi');

const registroActividadValidationSchema = Joi.object({
    id_usuario: Joi.string()
        .length(24)
        .required()
        .messages({
            'string.base': 'El ID del usuario debe ser un texto.',
            'string.empty': 'El ID del usuario es obligatorio.',
            'string.length': 'El ID del usuario debe tener 24 caracteres.'
        }),
    actividad: Joi.string()
        .max(500)
        .required()
        .messages({
            'string.base': 'La actividad debe ser un texto.',
            'string.empty': 'La actividad es obligatoria.',
            'string.max': 'La actividad no puede exceder los 500 caracteres.'
        }),
    fecha_actividad: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha de actividad debe ser una fecha válida.',
            'date.empty': 'La fecha de actividad es obligatoria.'
        })
});

module.exports = { registroActividadValidationSchema };
