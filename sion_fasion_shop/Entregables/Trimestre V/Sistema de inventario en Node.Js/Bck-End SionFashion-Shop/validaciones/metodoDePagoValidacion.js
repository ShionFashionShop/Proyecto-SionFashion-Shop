const Joi = require('joi');

// Esquema de validación de Joi para MetodosDePago
const metodosDePagoSchema = Joi.object({
    metodo_pago: Joi.string()
        .max(50)
        .required()
        .messages({
            'string.base': 'El método de pago debe ser un texto.',
            'string.max': 'El método de pago no puede exceder los 50 caracteres.',
            'any.required': 'El método de pago es obligatorio.'
        }),
    id_factura: Joi.string()
        .length(24) // Longitud de ObjectId
        .allow(null) // Permite que sea nulo
        .messages({
            'string.base': 'El ID de la factura debe ser un texto.',
            'string.length': 'El ID de la factura debe tener 24 caracteres.',
        }),
});

module.exports = metodosDePagoSchema;
