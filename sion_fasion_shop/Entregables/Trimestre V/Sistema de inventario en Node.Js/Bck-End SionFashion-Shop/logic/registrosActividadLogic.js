const RegistroActividad = require('../models/registroActividad'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo registro de actividad
const crearRegistroActividad = async (data) => {
    const nuevoRegistro = new RegistroActividad(data);
    return await nuevoRegistro.save();
};

// Obtener todos los registros de actividad
const obtenerRegistrosActividad = async () => {
    return await RegistroActividad.find()
        .populate('id_usuario'); // Poblamos la referencia
};

// Obtener un registro de actividad por ID
const obtenerRegistroActividadPorId = async (id) => {
    return await RegistroActividad.findById(id)
        .populate('id_usuario');
};

// Actualizar un registro de actividad por ID
const actualizarRegistroActividad = async (id, data) => {
    return await RegistroActividad.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un registro de actividad por ID
const eliminarRegistroActividad = async (id) => {
    return await RegistroActividad.findByIdAndDelete(id);
};

module.exports = {
    crearRegistroActividad,
    obtenerRegistrosActividad,
    obtenerRegistroActividadPorId,
    actualizarRegistroActividad,
    eliminarRegistroActividad,
};
