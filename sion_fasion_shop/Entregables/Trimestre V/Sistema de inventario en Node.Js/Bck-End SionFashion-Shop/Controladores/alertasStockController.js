const alertasStock = require('../models/alertasStock'); // Asegúrate de que la ruta al modelo sea correcta
const Producto = require('../models/producto');  // Asegúrate de ajustar la ruta según tu estructura
const alertasStockLogic = require('../logic/alertasStockLogic');

// Crear una nueva alerta de stock
const crearAlertaStock = async (req, res) => {
    try {
        const nuevaAlerta = await alertasStockLogic.crearAlertaStock(req.body);
        res.status(201).json(nuevaAlerta);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la alerta de stock: ' + error.message });
    }
};

// Obtener todas las alertas de stock
const obtenerAlertasStock = async (req, res) => {
    try {
        const alertas = await alertasStockLogic.obtenerAlertasStock();
        res.status(200).json(alertas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las alertas de stock: ' + error.message });
    }
};

// Obtener una alerta de stock por ID
const obtenerAlertaStockPorId = async (req, res) => {
    try {
        const alerta = await alertasStockLogic.obtenerAlertaStockPorId(req.params.id);
        if (!alerta) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }
        res.status(200).json(alerta);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la alerta de stock: ' + error.message });
    }
};

// Actualizar una alerta de stock
const actualizarAlertaStock = async (req, res) => {
    try {
        const alertaActualizada = await alertasStockLogic.actualizarAlertaStock(req.params.id, req.body);
        if (!alertaActualizada) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }
        res.status(200).json(alertaActualizada);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la alerta de stock: ' + error.message });
    }
};

// Eliminar una alerta de stock
const eliminarAlertaStock = async (req, res) => {
    try {
        const alertaEliminada = await alertasStockLogic.eliminarAlertaStock(req.params.id);
        if (!alertaEliminada) {
            return res.status(404).json({ message: 'Alerta no encontrada' });
        }
        res.status(200).json({ message: 'Alerta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la alerta de stock: ' + error.message });
    }
};

module.exports = {
    crearAlertaStock,
    obtenerAlertasStock,
    obtenerAlertaStockPorId,
    actualizarAlertaStock,
    eliminarAlertaStock
};
