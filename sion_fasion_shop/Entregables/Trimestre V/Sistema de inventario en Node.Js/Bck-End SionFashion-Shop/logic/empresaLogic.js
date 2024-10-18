const Empresa = require('../models/empresa'); // Asegúrate de que la ruta sea correcta

// Crear una nueva empresa
const crearEmpresa = async (data) => {
    const nuevaEmpresa = new Empresa(data);
    return await nuevaEmpresa.save();
};

// Obtener todas las empresas
const obtenerEmpresas = async () => {
    return await Empresa.find().populate('tienda'); // Popula las tiendas asociadas
};

// Obtener una empresa por ID
const obtenerEmpresaPorId = async (id) => {
    return await Empresa.findById(id).populate('tienda');
};

// Actualizar una empresa por ID
const actualizarEmpresa = async (id, data) => {
    return await Empresa.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar una empresa por ID
const eliminarEmpresa = async (id) => {
    return await Empresa.findByIdAndDelete(id);
};

module.exports = {
    crearEmpresa,
    obtenerEmpresas,
    obtenerEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa,
};
