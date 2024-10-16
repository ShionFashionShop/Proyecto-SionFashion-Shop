const Paise = require('../models/paise'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo país
exports.crearPaise = async (req, res) => {
    try {
        const nuevoPaise = new Paise(req.body);
        await nuevoPaise.save();
        res.status(201).json(nuevoPaise);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los países
exports.obtenerPaises = async (req, res) => {
    try {
        const paises = await Paise.find()
            .populate('departamentos'); // Poblamos la referencia a Departamento
        res.status(200).json(paises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un país por ID
exports.obtenerPaisePorId = async (req, res) => {
    try {
        const paise = await Paise.findById(req.params.id)
            .populate('departamentos');
        if (!paise) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json(paise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un país por ID
exports.actualizarPaise = async (req, res) => {
    try {
        const paiseActualizado = await Paise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!paiseActualizado) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json(paiseActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un país por ID
exports.eliminarPaise = async (req, res) => {
    try {
        const paiseEliminado = await Paise.findByIdAndDelete(req.params.id);
        if (!paiseEliminado) {
            return res.status(404).json({ message: 'País no encontrado' });
        }
        res.status(200).json({ message: 'País eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
