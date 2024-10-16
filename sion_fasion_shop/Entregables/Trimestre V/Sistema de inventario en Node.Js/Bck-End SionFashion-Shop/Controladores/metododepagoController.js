const MetodosDePago = require('../models/metodosDePago'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo método de pago
exports.crearMetodoDePago = async (req, res) => {
    try {
        const nuevoMetodoDePago = new MetodosDePago(req.body);
        await nuevoMetodoDePago.save();
        res.status(201).json(nuevoMetodoDePago);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los métodos de pago
exports.obtenerMetodosDePago = async (req, res) => {
    try {
        const metodosDePago = await MetodosDePago.find()
            .populate('id_factura'); // Popula la factura asociada
        res.status(200).json(metodosDePago);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un método de pago por ID
exports.obtenerMetodoDePagoPorId = async (req, res) => {
    try {
        const metodoDePago = await MetodosDePago.findById(req.params.id)
            .populate('id_factura');
        if (!metodoDePago) {
            return res.status(404).json({ message: 'Método de pago no encontrado' });
        }
        res.status(200).json(metodoDePago);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un método de pago por ID
exports.actualizarMetodoDePago = async (req, res) => {
    try {
        const metodoDePagoActualizado = await MetodosDePago.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!metodoDePagoActualizado) {
            return res.status(404).json({ message: 'Método de pago no encontrado' });
        }
        res.status(200).json(metodoDePagoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un método de pago por ID
exports.eliminarMetodoDePago = async (req, res) => {
    try {
        const metodoDePagoEliminado = await MetodosDePago.findByIdAndDelete(req.params.id);
        if (!metodoDePagoEliminado) {
            return res.status(404).json({ message: 'Método de pago no encontrado' });
        }
        res.status(200).json({ message: 'Método de pago eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
