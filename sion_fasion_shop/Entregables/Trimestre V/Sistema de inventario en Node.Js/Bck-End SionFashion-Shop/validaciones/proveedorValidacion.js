const Joi = require('joi');

const proveedorValidationSchema = Joi.object({
    nombre_proveedor: Joi.string()
        .max(255)
        .required()
        .messages({
            'string.base': 'El nombre del proveedor debe ser un texto.',
            'string.empty': 'El nombre del proveedor es obligatorio.',
            'string.max': 'El nombre del proveedor no puede exceder los 255 caracteres.'
        }),
    contacto_proveedor: Joi.string()
        .max(255)
        .messages({
            'string.base': 'El contacto del proveedor debe ser un texto.',
            'string.max': 'El contacto del proveedor no puede exceder los 255 caracteres.'
        }),
    email_proveedor: Joi.string()
        .email()
        .max(255)
        .messages({
            'string.base': 'El email del proveedor debe ser un texto.',
            'string.email': 'El email del proveedor no es válido.',
            'string.max': 'El email del proveedor no puede exceder los 255 caracteres.'
        }),
    id_ciudad: Joi.string()
        .optional(),
    productos: Joi.array()
        .items(Joi.string().length(24)) // Asegúrate de que sea un ObjectId
});

module.exports = { proveedorValidationSchema };
