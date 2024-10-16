const RegistroActividad = require('../models/registroActividad'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo registro de actividad
exports.crearRegistroActividad = async (req, res) => {
    try {
        const nuevoRegistro = new RegistroActividad(req.body);
        await nuevoRegistro.save();
        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los registros de actividad
exports.obtenerRegistrosActividad = async (req, res) => {
    try {
        const registros = await RegistroActividad.find()
            .populate('id_usuario'); // Poblamos la referencia
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un registro de actividad por ID
exports.obtenerRegistroActividadPorId = async (req, res) => {
    try {
        const registro = await RegistroActividad.findById(req.params.id)
            .populate('id_usuario');
        if (!registro) {
            return res.status(404).json({ message: 'Registro de actividad no encontrado' });
        }
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro de actividad por ID
exports.actualizarRegistroActividad = async (req, res) => {
    try {
        const registroActualizado = await RegistroActividad.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!registroActualizado) {
            return res.status(404).json({ message: 'Registro de actividad no encontrado' });
        }
        res.status(200).json(registroActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un registro de actividad por ID
exports.eliminarRegistroActividad = async (req, res) => {
    try {
        const registroEliminado = await RegistroActividad.findByIdAndDelete(req.params.id);
        if (!registroEliminado) {
            return res.status(404).json({ message: 'Registro de actividad no encontrado' });
        }
        res.status(200).json({ message: 'Registro de actividad eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
