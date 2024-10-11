const AlertasStock = require('../models/alertasStock'); // Asegúrate de que la ruta al modelo sea correcta

// Crear una nueva alerta de stock
const crearAlertaStock = async (req, res) => {
    try {
        const nuevaAlerta = new AlertasStock(req.body);
        await nuevaAlerta.save();
        res.status(201).json(nuevaAlerta);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las alertas de stock
const obtenerAlertasStock = async (req, res) => {
    try {
        const alertas = await AlertasStock.find().populate('id_productoNavigation');
        res.status(200).json(alertas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una alerta de stock por ID
const obtenerAlertaStockPorId = async (req, res) => {
    try {
        const alerta = await AlertasStock.findById(req.params.id).populate('id_productoNavigation');
        if (!alerta) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }
        res.status(200).json(alerta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una alerta de stock
const actualizarAlertaStock = async (req, res) => {
    try {
        const alertaActualizada = await AlertasStock.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!alertaActualizada) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }
        res.status(200).json(alertaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una alerta de stock
const eliminarAlertaStock = async (req, res) => {
    try {
        const alertaEliminada = await AlertasStock.findByIdAndDelete(req.params.id);
        if (!alertaEliminada) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }
        res.status(200).json({ message: 'Alerta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    crearAlertaStock,
    obtenerAlertasStock,
    obtenerAlertaStockPorId,
    actualizarAlertaStock,
    eliminarAlertaStock
};
