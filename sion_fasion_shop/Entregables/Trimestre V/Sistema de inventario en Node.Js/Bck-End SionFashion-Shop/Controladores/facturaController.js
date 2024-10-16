const Empresa = require('../models/empresa');

// Crear una nueva empresa
exports.crearEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = new Empresa(req.body);
        await nuevaEmpresa.save();
        res.status(201).json(nuevaEmpresa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las empresas
exports.obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.find()
            .populate('tienda'); // Popula las tiendas asociadas
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una empresa por ID
exports.obtenerEmpresaPorId = async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id)
            .populate('tienda');
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
        const empresaActualizada = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const empresaEliminada = await Empresa.findByIdAndDelete(req.params.id);
        if (!empresaEliminada) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }
        res.status(200).json({ message: 'Empresa eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
