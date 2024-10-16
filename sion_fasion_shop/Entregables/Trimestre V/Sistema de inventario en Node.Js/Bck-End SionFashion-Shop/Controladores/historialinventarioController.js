const HistorialInventario = require('../models/historialInventario');

// Crear un nuevo historial de inventario
exports.crearHistorialInventario = async (req, res) => {
    try {
        const nuevoHistorial = new HistorialInventario(req.body);
        await nuevoHistorial.save();
        res.status(201).json(nuevoHistorial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los registros de historial de inventario
exports.obtenerHistorialInventario = async (req, res) => {
    try {
        const historiales = await HistorialInventario.find()
            .populate('id_producto'); // Popula el producto asociado
        res.status(200).json(historiales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un historial de inventario por ID
exports.obtenerHistorialInventarioPorId = async (req, res) => {
    try {
        const historial = await HistorialInventario.findById(req.params.id)
            .populate('id_producto');
        if (!historial) {
            return res.status(404).json({ message: 'Historial de inventario no encontrado' });
        }
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un historial de inventario por ID
exports.actualizarHistorialInventario = async (req, res) => {
    try {
        const historialActualizado = await HistorialInventario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!historialActualizado) {
            return res.status(404).json({ message: 'Historial de inventario no encontrado' });
        }
        res.status(200).json(historialActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un historial de inventario por ID
exports.eliminarHistorialInventario = async (req, res) => {
    try {
        const historialEliminado = await HistorialInventario.findByIdAndDelete(req.params.id);
        if (!historialEliminado) {
            return res.status(404).json({ message: 'Historial de inventario no encontrado' });
        }
        res.status(200).json({ message: 'Historial de inventario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
