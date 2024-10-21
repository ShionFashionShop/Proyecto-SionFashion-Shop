const RegistroActividad = require('../models/registroActividad'); // Asegúrate de que la ruta sea correcta
const registrosActividadLogic = require('../logic/registrosActividadLogic'); // Ajusta la ruta según tu estructura
const { registroActividadValidationSchema } = require('../validaciones/registroActividadValidacion'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo registro de actividad
exports.crearRegistroActividad = async (req, res) => {
    try {
        // Validar los datos de entrada
        await registroActividadValidationSchema.validateAsync(req.body);
        const nuevoRegistro = await registrosActividadLogic.crearRegistroActividad(req.body);
        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el registro de actividad', error: error.message });
    }
};

// Obtener todos los registros de actividad
exports.obtenerRegistrosActividad = async (req, res) => {
    try {
        const registros = await registrosActividadLogic.obtenerRegistrosActividad();
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los registros de actividad', error: error.message });
    }
};

// Obtener un registro de actividad por ID
exports.obtenerRegistroActividadPorId = async (req, res) => {
    try {
        const registro = await registrosActividadLogic.obtenerRegistroActividadPorId(req.params.id);
        if (!registro) {
            return res.status(404).json({ message: 'Registro de actividad no encontrado' });
        }
        res.status(200).json(registro);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el registro de actividad', error: error.message });
    }
};

// Actualizar un registro de actividad por ID
exports.actualizarRegistroActividad = async (req, res) => {
    try {
        // Validar los datos de entrada
        await registroActividadValidationSchema.validateAsync(req.body);
        const registroActualizado = await registrosActividadLogic.actualizarRegistroActividad(req.params.id, req.body);
        if (!registroActualizado) {
            return res.status(404).json({ message: 'Registro de actividad no encontrado' });
        }
        res.status(200).json(registroActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el registro de actividad', error: error.message });
    }
};

// Eliminar un registro de actividad por ID
exports.eliminarRegistroActividad = async (req, res) => {
    try {
        const registroEliminado = await registrosActividadLogic.eliminarRegistroActividad(req.params.id);
        if (!registroEliminado) {
            return res.status(404).json({ message: 'Registro de actividad no encontrado' });
        }
        res.status(200).json({ message: 'Registro de actividad eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el registro de actividad', error: error.message });
    }
};
