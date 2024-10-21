const Joi = require('joi');

// Esquema de validación para el modelo Paise
const paiseSchema = Joi.object({
    nombre_pais: Joi.string()
        .required()
        .max(255)
        .messages({
            'string.base': 'El nombre del país debe ser una cadena.',
            'string.empty': 'El nombre del país es obligatorio.',
            'string.max': 'El nombre del país no puede exceder los 255 caracteres.'
        }),
    departamentos: Joi.array()
        .items(Joi.string().hex().length(24)) // Asumiendo que el ID del departamento es un ObjectId
        .optional() // Puede ser opcional si no siempre se envían departamentos
        .messages({
            'array.base': 'Los departamentos deben ser un arreglo.',
            'string.hex': 'Cada ID de departamento debe ser un ObjectId válido.',
            'string.length': 'Cada ID de departamento debe tener 24 caracteres.'
        })
});

// Exportar el esquema de validación
module.exports = { paiseSchema };
