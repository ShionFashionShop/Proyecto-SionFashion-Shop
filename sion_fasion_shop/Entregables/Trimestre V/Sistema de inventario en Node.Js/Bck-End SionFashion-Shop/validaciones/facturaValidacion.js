const Joi = require('joi');

// Definir el esquema de validación usando Joi
const facturaSchemaJoi = Joi.object({
    fecha_emision_factura: Joi.date().required().messages({
        'date.base': 'La fecha de emisión debe ser una fecha válida.',
        'any.required': 'La fecha de emisión es obligatoria.'
    }),
    sub_total_factura: Joi.number().min(0).max(9999999999.99).required().messages({
        'number.base': 'El subtotal debe ser un número válido.',
        'number.min': 'El subtotal no puede ser menor a 0.',
        'number.max': 'El subtotal no puede exceder 9999999999.99.',
        'any.required': 'El subtotal es obligatorio.'
    }),
    impuesto_factura: Joi.number().min(0).max(9999999999.99).required().messages({
        'number.base': 'El impuesto debe ser un número válido.',
        'number.min': 'El impuesto no puede ser menor a 0.',
        'number.max': 'El impuesto no puede exceder 9999999999.99.',
        'any.required': 'El impuesto es obligatorio.'
    }),
    total_factura: Joi.number().min(0).max(9999999999.99).required().messages({
        'number.base': 'El total debe ser un número válido.',
        'number.min': 'El total no puede ser menor a 0.',
        'number.max': 'El total no puede exceder 9999999999.99.',
        'any.required': 'El total es obligatorio.'
    }),
    id_clienteNavigation: Joi.string().optional(), // Especificar si debe ser requerido o no
    metodos_de_pagos: Joi.array().items(Joi.string()).optional(),
    ordenes_de_compras: Joi.array().items(Joi.string()).optional(),
    productos: Joi.array().items(Joi.string()).optional()
});

module.exports = facturaSchemaJoi;
