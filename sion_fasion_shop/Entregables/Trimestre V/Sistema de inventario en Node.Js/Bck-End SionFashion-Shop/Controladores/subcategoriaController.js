const SubCategoria = require('../models/sub_categoria'); // Asegúrate de que la ruta sea correcta
const subCategoriasLogic = require('../logic/subCategoriasLogic'); // Ajusta la ruta según tu estructura
const { subCategoriaValidationSchema } = require('../validaciones/subCategoriaValidacion'); // Asegúrate de que la ruta sea correcta

// Crear una nueva subcategoría
exports.crearSubCategoria = async (req, res) => {
    try {
        // Validar los datos de entrada
        await subCategoriaValidationSchema.validateAsync(req.body);
        const nuevaSubCategoria = await subCategoriasLogic.crearSubCategoria(req.body);
        res.status(201).json(nuevaSubCategoria);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la subcategoría', error: error.message });
    }
};

// Obtener todas las subcategorías
exports.obtenerSubCategorias = async (req, res) => {
    try {
        const subCategorias = await subCategoriasLogic.obtenerSubCategorias();
        res.status(200).json(subCategorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las subcategorías', error: error.message });
    }
};

// Obtener una subcategoría por ID
exports.obtenerSubCategoriaPorId = async (req, res) => {
    try {
        const subCategoria = await subCategoriasLogic.obtenerSubCategoriaPorId(req.params.id);
        if (!subCategoria) {
            return res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
        res.status(200).json(subCategoria);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la subcategoría', error: error.message });
    }
};

// Actualizar una subcategoría por ID
exports.actualizarSubCategoria = async (req, res) => {
    try {
        // Validar los datos de entrada
        await subCategoriaValidationSchema.validateAsync(req.body);
        const subCategoriaActualizada = await subCategoriasLogic.actualizarSubCategoria(req.params.id, req.body);
        if (!subCategoriaActualizada) {
            return res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
        res.status(200).json(subCategoriaActualizada);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la subcategoría', error: error.message });
    }
};

// Eliminar una subcategoría por ID
exports.eliminarSubCategoria = async (req, res) => {
    try {
        const subCategoriaEliminada = await subCategoriasLogic.eliminarSubCategoria(req.params.id);
        if (!subCategoriaEliminada) {
            return res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
        res.status(200).json({ message: 'Subcategoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la subcategoría', error: error.message });
    }
};
