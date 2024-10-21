const OrdenesProducto = require('../models/ordenesProducto'); // Asegúrate de que la ruta sea correcta
const ordenesProductoLogic = require('../logic/ordenesProductoLogic'); // Asegúrate de ajustar la ruta según tu estructura
const { ordenesProductoSchema } = require('../validaciones/ordenesProductoValidacion'); // Ajusta la ruta

// Crear una nueva orden de producto
exports.crearOrdenDeProducto = async (req, res) => {
    const { error } = ordenesProductoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Error en la validación', error: error.details[0].message });
    }
    
    try {
        const nuevaOrdenDeProducto = await ordenesProductoLogic.crearOrdenDeProducto(req.body);
        res.status(201).json(nuevaOrdenDeProducto);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la orden de producto', error: error.message });
    }
};

// Obtener todas las órdenes de producto
exports.obtenerOrdenesProducto = async (req, res) => {
    try {
        const ordenesProducto = await ordenesProductoLogic.obtenerOrdenesProducto();
        res.status(200).json(ordenesProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las órdenes de producto', error: error.message });
    }
};

// Obtener una orden de producto por ID
exports.obtenerOrdenDeProductoPorId = async (req, res) => {
    try {
        const ordenDeProducto = await ordenesProductoLogic.obtenerOrdenDeProductoPorId(req.params.id);
        if (!ordenDeProducto) {
            return res.status(404).json({ message: 'Orden de producto no encontrada' });
        }
        res.status(200).json(ordenDeProducto);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la orden de producto', error: error.message });
    }
};

// Actualizar una orden de producto por ID
exports.actualizarOrdenDeProducto = async (req, res) => {
    const { error } = ordenesProductoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Error en la validación', error: error.details[0].message });
    }

    try {
        const ordenDeProductoActualizada = await ordenesProductoLogic.actualizarOrdenDeProducto(req.params.id, req.body);
        if (!ordenDeProductoActualizada) {
            return res.status(404).json({ message: 'Orden de producto no encontrada' });
        }
        res.status(200).json(ordenDeProductoActualizada);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la orden de producto', error: error.message });
    }
};

// Eliminar una orden de producto por ID
exports.eliminarOrdenDeProducto = async (req, res) => {
    try {
        const ordenDeProductoEliminada = await ordenesProductoLogic.eliminarOrdenDeProducto(req.params.id);
        if (!ordenDeProductoEliminada) {
            return res.status(404).json({ message: 'Orden de producto no encontrada' });
        }
        res.status(200).json({ message: 'Orden de producto eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la orden de producto', error: error.message });
    }
};
