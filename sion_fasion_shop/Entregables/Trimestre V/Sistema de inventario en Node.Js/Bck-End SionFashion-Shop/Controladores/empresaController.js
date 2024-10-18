const Empresa = require('../models/empresa');
const empresaLogic = require('../logic/empresaLogic'); // Asegúrate de ajustar la ruta según tu estructura

// Crear una nueva empresa
exports.crearEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = await empresaLogic.crearEmpresa(req.body);
        res.status(201).json(nuevaEmpresa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las empresas
exports.obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await empresaLogic.obtenerEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una empresa por ID
exports.obtenerEmpresaPorId = async (req, res) => {
    try {
        const empresa = await empresaLogic.obtenerEmpresaPorId(req.params.id);
        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una empresa por ID
exports.actualizarEmpresa = async (req, res) => {
    try {
        const empresaActualizada = await empresaLogic.actualizarEmpresa(req.params.id, req.body);
        if (!empresaActualizada) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.status(200).json(empresaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una empresa por ID
exports.eliminarEmpresa = async (req, res) => {
    try {
        const empresaEliminada = await empresaLogic.eliminarEmpresa(req.params.id);
        if (!empresaEliminada) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.status(200).json({ message: 'Empresa eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
