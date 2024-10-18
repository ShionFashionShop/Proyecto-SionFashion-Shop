const Departamento = require('../models/departamento');
const departamentoLogic = require('../logic/departamentoLogic'); // Asegúrate de ajustar la ruta según tu estructura

// Crear un nuevo departamento
exports.crearDepartamento = async (req, res) => {
    try {
        const nuevoDepartamento = await departamentoLogic.crearDepartamento(req.body);
        res.status(201).json(nuevoDepartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los departamentos
exports.obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await departamentoLogic.obtenerDepartamentos();
        res.status(200).json(departamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un departamento por ID
exports.obtenerDepartamentoPorId = async (req, res) => {
    try {
        const departamento = await departamentoLogic.obtenerDepartamentoPorId(req.params.id);
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.status(200).json(departamento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un departamento por ID
exports.actualizarDepartamento = async (req, res) => {
    try {
        const departamentoActualizado = await departamentoLogic.actualizarDepartamento(req.params.id, req.body);
        if (!departamentoActualizado) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.status(200).json(departamentoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un departamento por ID
exports.eliminarDepartamento = async (req, res) => {
    try {
        const departamentoEliminado = await departamentoLogic.eliminarDepartamento(req.params.id);
        if (!departamentoEliminado) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.status(200).json({ message: 'Departamento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
