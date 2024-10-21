
const Categoria = require('../models/categoria'); // Asegúrate de que la ruta sea correcta
const Producto = require('../models/producto');  // Asegúrate de ajustar la ruta según tu estructura
const SubCategoria = require ('../models/sub_categoria');
const categoriaLogic = require('../logic/categoriaLogic'); // Asegúrate de ajustar la ruta según tu estructura
const categoriaValidation = require('../validaciones/categoriaValidacion'); // Importa las validaciones con Joi

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = categoriaValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevaCategoria = await categoriaLogic.crearCategoria(req.body);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await categoriaLogic.obtenerCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una categoría por su ID
exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await categoriaLogic.obtenerCategoriaPorId(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una categoría por su ID
exports.actualizarCategoria = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = categoriaValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const categoria = await categoriaLogic.actualizarCategoria(req.params.id, req.body);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una categoría por su ID
exports.eliminarCategoria = async (req, res) => {
    try {
        const categoria = await categoriaLogic.eliminarCategoria(req.params.id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};