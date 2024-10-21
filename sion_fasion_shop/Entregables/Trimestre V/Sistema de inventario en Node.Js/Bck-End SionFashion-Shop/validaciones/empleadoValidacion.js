const Joi = require('joi');

const empleadoValidationSchema = Joi.object({
    dni_empleado: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.max': 'El DNI no puede exceder los 255 caracteres.',
            'any.required': 'El DNI del empleado es obligatorio.'
        }),
    nombres_empleado: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.max': 'El nombre no puede exceder los 255 caracteres.',
            'any.required': 'El nombre del empleado es obligatorio.'
        }),
    apellidos_empleado: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.max': 'El apellido no puede exceder los 255 caracteres.',
            'any.required': 'El apellido del empleado es obligatorio.'
        }),
    telefono_empleado: Joi.string()
        .pattern(/^\d{10}$/)
        .allow(null)
        .messages({
            'string.pattern.base': 'El número de teléfono no tiene un formato válido. Debe contener 10 dígitos.'
        }),
    email_empleado: Joi.string()
        .email()
        .max(255)
        .allow(null)
        .messages({
            'string.email': 'El correo electrónico no tiene un formato válido.',
            'string.max': 'El correo electrónico no puede exceder los 255 caracteres.'
        }),
    id_tienda: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .allow(null)
        .messages({
            'string.pattern.base': 'El ID de la tienda debe ser un ObjectId válido.'
        }),
    id_ciudad: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .allow(null)
        .messages({
            'string.pattern.base': 'El ID de la ciudad debe ser un ObjectId válido.'
        }),
    ordenes_de_compras: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID de la orden de compra debe ser un ObjectId válido.'
    })
});

module.exports = empleadoValidationSchema;
