const Departamento = require('../models/departamento'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo departamento
const crearDepartamento = async (data) => {
    const nuevoDepartamento = new Departamento(data);
    return await nuevoDepartamento.save();
};

// Obtener todos los departamentos
const obtenerDepartamentos = async () => {
    return await Departamento.find()
        .populate('id_pais') // Poblamos la referencia al país
        .populate('ciudades'); // Poblamos las ciudades asociadas
};

// Obtener un departamento por ID
const obtenerDepartamentoPorId = async (id) => {
    return await Departamento.findById(id)
        .populate('id_pais')
        .populate('ciudades');
};

// Actualizar un departamento por ID
const actualizarDepartamento = async (id, data) => {
    return await Departamento.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un departamento por ID
const eliminarDepartamento = async (id) => {
    return await Departamento.findByIdAndDelete(id);
};

module.exports = {
    crearDepartamento,
    obtenerDepartamentos,
    obtenerDepartamentoPorId,
    actualizarDepartamento,
    eliminarDepartamento,
};
