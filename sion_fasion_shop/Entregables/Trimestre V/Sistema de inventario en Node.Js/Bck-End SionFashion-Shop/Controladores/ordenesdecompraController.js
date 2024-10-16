const OrdenesDeCompra = require('../models/ordenesDeCompra'); // Asegúrate de que la ruta sea correcta

// Crear una nueva orden de compra
exports.crearOrdenDeCompra = async (req, res) => {
    try {
        const nuevaOrdenDeCompra = new OrdenesDeCompra(req.body);
        await nuevaOrdenDeCompra.save();
        res.status(201).json(nuevaOrdenDeCompra);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las órdenes de compra
exports.obtenerOrdenesDeCompra = async (req, res) => {
    try {
        const ordenesDeCompra = await OrdenesDeCompra.find()
            .populate('id_cliente')
            .populate('id_factura')
            .populate('id_empleado')
            .populate('ordenes_productos'); // Popula los productos de la orden
        res.status(200).json(ordenesDeCompra);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una orden de compra por ID
exports.obtenerOrdenDeCompraPorId = async (req, res) => {
    try {
        const ordenDeCompra = await OrdenesDeCompra.findById(req.params.id)
            .populate('id_cliente')
            .populate('id_factura')
            .populate('id_empleado')
            .populate('ordenes_productos');
        if (!ordenDeCompra) {
            return res.status(404).json({ message: 'Orden de compra no encontrada' });
        }
        res.status(200).json(ordenDeCompra);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una orden de compra por ID
exports.actualizarOrdenDeCompra = async (req, res) => {
    try {
        const ordenDeCompraActualizada = await OrdenesDeCompra.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ordenDeCompraActualizada) {
            return res.status(404).json({ message: 'Orden de compra no encontrada' });
        }
        res.status(200).json(ordenDeCompraActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una orden de compra por ID
exports.eliminarOrdenDeCompra = async (req, res) => {
    try {
        const ordenDeCompraEliminada = await OrdenesDeCompra.findByIdAndDelete(req.params.id);
        if (!ordenDeCompraEliminada) {
            return res.status(404).json({ message: 'Orden de compra no encontrada' });
        }
        res.status(200).json({ message: 'Orden de compra eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
