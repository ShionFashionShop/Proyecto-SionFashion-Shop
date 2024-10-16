const Inventario = require('../models/inventario');

// Crear un nuevo registro de inventario
exports.crearInventario = async (req, res) => {
    try {
        const nuevoInventario = new Inventario(req.body);
        await nuevoInventario.save();
        res.status(201).json(nuevoInventario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los registros de inventario
exports.obtenerInventarios = async (req, res) => {
    try {
        const inventarios = await Inventario.find()
            .populate('id_producto'); // Popula el producto asociado
        res.status(200).json(inventarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un registro de inventario por ID
exports.obtenerInventarioPorId = async (req, res) => {
    try {
        const inventario = await Inventario.findById(req.params.id)
            .populate('id_producto');
        if (!inventario) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json(inventario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro de inventario por ID
exports.actualizarInventario = async (req, res) => {
    try {
        const inventarioActualizado = await Inventario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!inventarioActualizado) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json(inventarioActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un registro de inventario por ID
exports.eliminarInventario = async (req, res) => {
    try {
        const inventarioEliminado = await Inventario.findByIdAndDelete(req.params.id);
        if (!inventarioEliminado) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json({ message: 'Inventario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
