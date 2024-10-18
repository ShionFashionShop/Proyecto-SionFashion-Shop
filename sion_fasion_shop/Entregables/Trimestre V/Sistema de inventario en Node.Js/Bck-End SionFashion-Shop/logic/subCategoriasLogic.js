const SubCategoria = require('../models/sub_categoria'); // Asegúrate de que la ruta sea correcta

// Crear una nueva subcategoría
const crearSubCategoria = async (data) => {
    const nuevaSubCategoria = new SubCategoria(data);
    return await nuevaSubCategoria.save();
};

// Obtener todas las subcategorías
const obtenerSubCategorias = async () => {
    return await SubCategoria.find().populate('id_categoria productos'); // Poblamos las referencias
};

// Obtener una subcategoría por ID
const obtenerSubCategoriaPorId = async (id) => {
    return await SubCategoria.findById(id).populate('id_categoria productos');
};

// Actualizar una subcategoría por ID
const actualizarSubCategoria = async (id, data) => {
    return await SubCategoria.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar una subcategoría por ID
const eliminarSubCategoria = async (id) => {
    return await SubCategoria.findByIdAndDelete(id);
};

module.exports = {
    crearSubCategoria,
    obtenerSubCategorias,
    obtenerSubCategoriaPorId,
    actualizarSubCategoria,
    eliminarSubCategoria,
};
