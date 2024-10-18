const AlertasStock = require('../models/alertasStock');
const Producto = require('../models/producto'); // Asegúrate de ajustar la ruta según tu estructura

// Crear una nueva alerta de stock
const crearAlertaStock = async (data) => {
    try {
        const nuevaAlerta = new AlertasStock(data);
        const alertaGuardada = await nuevaAlerta.save();
        return alertaGuardada;
    } catch (error) {
        throw new Error('Error al crear la alerta de stock: ' + error.message);
    }
};

// Obtener todas las alertas de stock
const obtenerAlertasStock = async () => {
    try {
        const alertas = await AlertasStock.find().populate('id_productoNavigation');
        return alertas;
    } catch (error) {
        throw new Error('Error al obtener las alertas de stock: ' + error.message);
    }
};

// Obtener una alerta de stock por ID
const obtenerAlertaStockPorId = async (id) => {
    try {
        const alerta = await AlertasStock.findById(id).populate('id_productoNavigation');
        if (!alerta) {
            throw new Error('Alerta de stock no encontrada');
        }
        return alerta;
    } catch (error) {
        throw new Error('Error al obtener la alerta de stock: ' + error.message);
    }
};

// Actualizar una alerta de stock
const actualizarAlertaStock = async (id, data) => {
    try {
        const alertaActualizada = await AlertasStock.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!alertaActualizada) {
            throw new Error('Alerta de stock no encontrada');
        }
        return alertaActualizada;
    } catch (error) {
        throw new Error('Error al actualizar la alerta de stock: ' + error.message);
    }
};

// Eliminar una alerta de stock
const eliminarAlertaStock = async (id) => {
    try {
        const alertaEliminada = await AlertasStock.findByIdAndDelete(id);
        if (!alertaEliminada) {
            throw new Error('Alerta de stock no encontrada');
        }
        return { message: 'Alerta eliminada correctamente' };
    } catch (error) {
        throw new Error('Error al eliminar la alerta de stock: ' + error.message);
    }
};

module.exports = {
    crearAlertaStock,
    obtenerAlertasStock,
    obtenerAlertaStockPorId,
    actualizarAlertaStock,
    eliminarAlertaStock
};
