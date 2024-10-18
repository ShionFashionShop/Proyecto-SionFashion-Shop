const OrdenesDeCompra = require('../models/ordenesDeCompra'); // Asegúrate de que la ruta sea correcta
const ordenesDeCompraLogic = require('../logic/ordenesDeCompraLogic'); // Asegúrate de ajustar la ruta según tu estructura

// Crear una nueva orden de compra
exports.crearOrdenDeCompra = async (req, res) => {
    try {
        const nuevaOrdenDeCompra = await ordenesDeCompraLogic.crearOrdenDeCompra(req.body);
        res.status(201).json(nuevaOrdenDeCompra);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las órdenes de compra
exports.obtenerOrdenesDeCompra = async (req, res) => {
    try {
        const ordenesDeCompra = await ordenesDeCompraLogic.obtenerOrdenesDeCompra();
        res.status(200).json(ordenesDeCompra);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una orden de compra por ID
exports.obtenerOrdenDeCompraPorId = async (req, res) => {
    try {
        const ordenDeCompra = await ordenesDeCompraLogic.obtenerOrdenDeCompraPorId(req.params.id);
        if (!ordenDeCompra) {
            return res.status(404).json({ message: 'Orden de compra no encontrada' });
        }
        res.status(200).json(ordenDeCompra);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una orden de compra por ID
exports.actualizarOrdenDeCompra = async (req, res) => {
    try {
        const ordenDeCompraActualizada = await ordenesDeCompraLogic.actualizarOrdenDeCompra(req.params.id, req.body);
        if (!ordenDeCompraActualizada) {
            return res.status(404).json({ message: 'Orden de compra no encontrada' });
        }
        res.status(200).json(ordenDeCompraActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una orden de compra por ID
exports.eliminarOrdenDeCompra = async (req, res) => {
    try {
        const ordenDeCompraEliminada = await ordenesDeCompraLogic.eliminarOrdenDeCompra(req.params.id);
        if (!ordenDeCompraEliminada) {
            return res.status(404).json({ message: 'Orden de compra no encontrada' });
        }
        res.status(200).json({ message: 'Orden de compra eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
