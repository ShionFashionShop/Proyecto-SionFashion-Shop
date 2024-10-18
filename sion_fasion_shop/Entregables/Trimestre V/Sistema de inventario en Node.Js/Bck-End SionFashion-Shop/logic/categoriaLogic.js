const Categoria = require('../models/categoria'); // Asegúrate de que la ruta sea correcta

// Crear una nueva categoría
const crearCategoria = async (data) => {
    const nuevaCategoria = new Categoria(data);
    return await nuevaCategoria.save();
};

// Obtener todas las categorías
const obtenerCategorias = async () => {
    return await Categoria.find().populate('sub_categoria'); // Si deseas obtener subcategorías también
};

// Obtener una categoría por su ID
const obtenerCategoriaPorId = async (id) => {
    return await Categoria.findById(id).populate('sub_categoria');
};

// Actualizar una categoría por su ID
const actualizarCategoria = async (id, data) => {
    return await Categoria.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar una categoría por su ID
const eliminarCategoria = async (id) => {
    return await Categoria.findByIdAndDelete(id);
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria,
};
