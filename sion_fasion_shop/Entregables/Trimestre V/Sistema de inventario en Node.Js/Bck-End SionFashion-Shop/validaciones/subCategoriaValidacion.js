const Joi = require('joi');

const subCategoriaValidationSchema = Joi.object({
    nombre_sub_categoria: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'El nombre de la subcategoría debe ser una cadena de texto.',
            'string.max': 'El nombre de la subcategoría no puede exceder los 255 caracteres.',
            'any.required': 'El nombre de la subcategoría es obligatorio.'
        }),
    id_categoria: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'ID de MongoDB')
        .required()
        .messages({
            'string.pattern.name': 'El ID de la categoría debe ser un ID de MongoDB válido.',
            'any.required': 'El ID de la categoría es obligatorio.'
        }),
    productos: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de MongoDB'))
        .optional()
        .messages({
            'string.pattern.name': 'Cada ID de producto debe ser un ID de MongoDB válido.'
        })
});

module.exports = { subCategoriaValidationSchema };
