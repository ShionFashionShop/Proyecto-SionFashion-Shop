const Paise = require('../models/paise'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo país
const crearPaise = async (data) => {
    const nuevoPaise = new Paise(data);
    return await nuevoPaise.save();
};

// Obtener todos los países
const obtenerPaises = async () => {
    return await Paise.find()
        .populate('departamentos'); // Poblamos la referencia a Departamento
};

// Obtener un país por ID
const obtenerPaisePorId = async (id) => {
    return await Paise.findById(id)
        .populate('departamentos');
};

// Actualizar un país por ID
const actualizarPaise = async (id, data) => {
    return await Paise.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un país por ID
const eliminarPaise = async (id) => {
    return await Paise.findByIdAndDelete(id);
};

module.exports = {
    crearPaise,
    obtenerPaises,
    obtenerPaisePorId,
    actualizarPaise,
    eliminarPaise,
};
