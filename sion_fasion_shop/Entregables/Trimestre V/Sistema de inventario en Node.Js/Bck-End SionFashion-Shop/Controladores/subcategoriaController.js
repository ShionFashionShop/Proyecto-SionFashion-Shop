const SubCategoria = require('../models/subCategoria'); // Asegúrate de que la ruta sea correcta

// Crear una nueva subcategoría
exports.crearSubCategoria = async (req, res) => {
    try {
        const nuevaSubCategoria = new SubCategoria(req.body);
        await nuevaSubCategoria.save();
        res.status(201).json(nuevaSubCategoria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las subcategorías
exports.obtenerSubCategorias = async (req, res) => {
    try {
        const subCategorias = await SubCategoria.find().populate('id_categoria productos'); // Poblamos las referencias
        res.status(200).json(subCategorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una subcategoría por ID
exports.obtenerSubCategoriaPorId = async (req, res) => {
    try {
        const subCategoria = await SubCategoria.findById(req.params.id).populate('id_categoria productos');
        if (!subCategoria) {
            return res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
        res.status(200).json(subCategoria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una subcategoría por ID
exports.actualizarSubCategoria = async (req, res) => {
    try {
        const subCategoriaActualizada = await SubCategoria.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subCategoriaActualizada) {
            return res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
        res.status(200).json(subCategoriaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una subcategoría por ID
exports.eliminarSubCategoria = async (req, res) => {
    try {
        const subCategoriaEliminada = await SubCategoria.findByIdAndDelete(req.params.id);
        if (!subCategoriaEliminada) {
            return res.status(404).json({ message: 'Subcategoría no encontrada' });
        }
        res.status(200).json({ message: 'Subcategoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
