const Joi = require('joi');

const ciudadeValidationSchema = Joi.object({
    nombre_ciudad: Joi.string()
        .max(100)
        .required()
        .messages({
            'string.base': 'El nombre de la ciudad debe ser un texto.',
            'string.max': 'El nombre de la ciudad no puede exceder los 100 caracteres.',
            'any.required': 'El nombre de la ciudad es obligatorio.'
        }),
    empleados: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID del empleado debe ser un ObjectId válido.'
    }),
    id_departamentoNavigation: Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        'string.pattern.base': 'El ID del departamento debe ser un ObjectId válido.'
    }),
    proveedores: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID del proveedor debe ser un ObjectId válido.'
    }),
    tienda: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID de la tienda debe ser un ObjectId válido.'
    })
});

module.exports = ciudadeValidationSchema;
