const Joi = require('joi');

// Esquema de validación de Joi para OrdenesDeCompra
const ordenesDeCompraSchema = Joi.object({
    id_cliente: Joi.string()
        .length(24) // Longitud de ObjectId
        .required()
        .messages({
            'string.base': 'El ID del cliente debe ser un texto.',
            'string.length': 'El ID del cliente debe tener 24 caracteres.',
            'any.required': 'El ID del cliente es obligatorio.'
        }),
    id_factura: Joi.string()
        .length(24) // Longitud de ObjectId
        .allow(null) // Permite que sea nulo
        .messages({
            'string.base': 'El ID de la factura debe ser un texto.',
            'string.length': 'El ID de la factura debe tener 24 caracteres.',
        }),
    id_empleado: Joi.string()
        .length(24) // Longitud de ObjectId
        .allow(null) // Permite que sea nulo
        .messages({
            'string.base': 'El ID del empleado debe ser un texto.',
            'string.length': 'El ID del empleado debe tener 24 caracteres.',
        }),
    ordenes_productos: Joi.array()
        .items(Joi.string().length(24).messages({
            'string.base': 'Cada ID de producto debe ser un texto.',
            'string.length': 'Cada ID de producto debe tener 24 caracteres.',
        }))
        .allow(null) // Permite que sea nulo
});

module.exports = ordenesDeCompraSchema;
