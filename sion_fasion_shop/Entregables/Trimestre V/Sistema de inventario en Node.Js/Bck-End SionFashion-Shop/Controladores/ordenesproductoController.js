const OrdenesProducto = require('../models/ordenesProducto'); // Asegúrate de que la ruta sea correcta

// Crear una nueva orden de producto
exports.crearOrdenDeProducto = async (req, res) => {
    try {
        const nuevaOrdenDeProducto = new OrdenesProducto(req.body);
        await nuevaOrdenDeProducto.save();
        res.status(201).json(nuevaOrdenDeProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las órdenes de producto
exports.obtenerOrdenesProducto = async (req, res) => {
    try {
        const ordenesProducto = await OrdenesProducto.find()
            .populate('id_orden_compra') // Poblamos la referencia a OrdenesDeCompra
            .populate('id_producto'); // Poblamos la referencia a Producto
        res.status(200).json(ordenesProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una orden de producto por ID
exports.obtenerOrdenDeProductoPorId = async (req, res) => {
    try {
        const ordenDeProducto = await OrdenesProducto.findById(req.params.id)
            .populate('id_orden_compra')
            .populate('id_producto');
        if (!ordenDeProducto) {
            return res.status(404).json({ message: 'Orden de producto no encontrada' });
        }
        res.status(200).json(ordenDeProducto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una orden de producto por ID
exports.actualizarOrdenDeProducto = async (req, res) => {
    try {
        const ordenDeProductoActualizada = await OrdenesProducto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ordenDeProductoActualizada) {
            return res.status(404).json({ message: 'Orden de producto no encontrada' });
        }
        res.status(200).json(ordenDeProductoActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una orden de producto por ID
exports.eliminarOrdenDeProducto = async (req, res) => {
    try {
        const ordenDeProductoEliminada = await OrdenesProducto.findByIdAndDelete(req.params.id);
        if (!ordenDeProductoEliminada) {
            return res.status(404).json({ message: 'Orden de producto no encontrada' });
        }
        res.status(200).json({ message: 'Orden de producto eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
