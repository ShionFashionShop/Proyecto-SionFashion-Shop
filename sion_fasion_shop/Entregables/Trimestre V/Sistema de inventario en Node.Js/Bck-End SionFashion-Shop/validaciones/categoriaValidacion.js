const Joi = require('joi');

const categoriaValidationSchema = Joi.object({
    nombre_categoria: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.base': 'El nombre de la categoría debe ser un texto.',
            'string.max': 'El nombre de la categoría no puede exceder los 100 caracteres.',
            'any.required': 'El nombre de la categoría es obligatorio.'
        }),
    sub_categoria: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID de la subcategoría debe ser un ObjectId válido.'
    })
});

module.exports = categoriaValidationSchema;
