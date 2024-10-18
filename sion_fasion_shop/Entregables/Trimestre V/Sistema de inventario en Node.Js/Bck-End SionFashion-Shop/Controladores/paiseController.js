const Paise = require('../models/paise'); // Asegúrate de que la ruta sea correcta
const paisesLogic = require('../logic/paiseLogic'); // Asegúrate de ajustar la ruta según tu estructura

// Crear un nuevo país
exports.crearPaise = async (req, res) => {
    try {
        const nuevoPaise = await paisesLogic.crearPaise(req.body);
        res.status(201).json(nuevoPaise);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el país', error: error.message });
    }
};

// Obtener todos los países
exports.obtenerPaises = async (req, res) => {
    try {
        const paises = await paisesLogic.obtenerPaises();
        res.status(200).json(paises);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los países', error: error.message });
    }
};

// Obtener un país por ID
exports.obtenerPaisePorId = async (req, res) => {
    try {
        const paise = await paisesLogic.obtenerPaisePorId(req.params.id);
        if (!paise) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json(paise);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el país', error: error.message });
    }
};

// Actualizar un país por ID
exports.actualizarPaise = async (req, res) => {
    try {
        const paiseActualizado = await paisesLogic.actualizarPaise(req.params.id, req.body);
        if (!paiseActualizado) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json(paiseActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el país', error: error.message });
    }
};

// Eliminar un país por ID
exports.eliminarPaise = async (req, res) => {
    try {
        const paiseEliminado = await paisesLogic.eliminarPaise(req.params.id);
        if (!paiseEliminado) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json({ message: 'País eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el país', error: error.message });
    }
};
