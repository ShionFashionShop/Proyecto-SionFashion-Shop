const Joi = require('joi');

const clienteValidationSchema = Joi.object({
    nombre_cliente: Joi.string()
        .max(255)
        .allow(null, '')
        .messages({
            'string.max': 'El nombre del cliente no puede exceder los 255 caracteres.',
        }),
    email_cliente: Joi.string()
        .max(255)
        .allow(null, '')
        .email({ tlds: { allow: false } }) // Validación de correo electrónico
        .messages({
            'string.max': 'El correo electrónico no puede exceder los 255 caracteres.',
            'string.email': 'El correo electrónico no es válido.'
        }),
    telefono_cliente: Joi.string()
        .max(255)
        .allow(null, '')
        .pattern(/^\+?[0-9\s]+$/) // Validación de formato de teléfono
        .messages({
            'string.max': 'El número de teléfono no puede exceder los 255 caracteres.',
            'string.pattern.base': 'El número de teléfono no es válido.'
        }),
    direccion_cliente: Joi.string()
        .max(255)
        .allow(null, '')
        .messages({
            'string.max': 'La dirección no puede exceder los 255 caracteres.',
        }),
    facturas: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID de la factura debe ser un ObjectId válido.'
    }),
    ordenes_de_compras: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).messages({
        'string.pattern.base': 'El ID de la orden de compra debe ser un ObjectId válido.'
    })
});

module.exports = clienteValidationSchema;
