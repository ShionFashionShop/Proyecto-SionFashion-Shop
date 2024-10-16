const Departamento = require('../models/departamento');

// Crear un nuevo departamento
exports.crearDepartamento = async (req, res) => {
    try {
        const nuevoDepartamento = new Departamento(req.body);
        await nuevoDepartamento.save();
        res.status(201).json(nuevoDepartamento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los departamentos
exports.obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.find()
            .populate('id_pais') // Poblamos la referencia al país
            .populate('ciudades'); // Poblamos las ciudades asociadas
        res.status(200).json(departamentos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un departamento por ID
exports.obtenerDepartamentoPorId = async (req, res) => {
    try {
        const departamento = await Departamento.findById(req.params.id)
            .populate('id_pais')
            .populate('ciudades');
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
        const departamentoActualizado = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const departamentoEliminado = await Departamento.findByIdAndDelete(req.params.id);
        if (!departamentoEliminado) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        res.status(200).json({ message: 'Departamento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
