const MetodosDePago = require('../models/metodosDePago'); // Asegúrate de que la ruta sea correcta
const metodosDePagoLogic = require('../logic/metodosDePagoLogic'); // Asegúrate de ajustar la ruta según tu estructura
const metodosDePagoSchema = require('../validaciones/metodoDePagoValidacion'); // Ajusta la ruta según tu estructura

// Crear un nuevo método de pago
exports.crearMetodoDePago = async (req, res) => {
    try {
        // Validar el cuerpo de la solicitud
        const { error } = metodosDePagoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const nuevoMetodoDePago = await metodosDePagoLogic.crearMetodoDePago(req.body);
        res.status(201).json(nuevoMetodoDePago);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los métodos de pago
exports.obtenerMetodosDePago = async (req, res) => {
    try {
        const metodosDePago = await metodosDePagoLogic.obtenerMetodosDePago();
        res.status(200).json(metodosDePago);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un método de pago por ID
exports.obtenerMetodoDePagoPorId = async (req, res) => {
    try {
        const metodoDePago = await metodosDePagoLogic.obtenerMetodoDePagoPorId(req.params.id);
        if (!metodoDePago) {
            return res.status(404).json({ message: 'Método de pago no encontrado' });
        }
        res.status(200).json(metodoDePago);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un método de pago por ID
exports.actualizarMetodoDePago = async (req, res) => {
    try {
        // Validar el cuerpo de la solicitud
        const { error } = metodosDePagoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const metodoDePagoActualizado = await metodosDePagoLogic.actualizarMetodoDePago(req.params.id, req.body);
        if (!metodoDePagoActualizado) {
            return res.status(404).json({ message: 'Método de pago no encontrado' });
        }
        res.status(200).json(metodoDePagoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un método de pago por ID
exports.eliminarMetodoDePago = async (req, res) => {
    try {
        const metodoDePagoEliminado = await metodosDePagoLogic.eliminarMetodoDePago(req.params.id);
        if (!metodoDePagoEliminado) {
            return res.status(404).json({ message: 'Método de pago no encontrado' });
        }
        res.status(200).json({ message: 'Método de pago eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
