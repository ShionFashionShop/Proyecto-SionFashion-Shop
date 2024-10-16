const Tienda = require('../models/tienda'); // Asegúrate de que la ruta sea correcta

// Crear una nueva tienda
exports.crearTienda = async (req, res) => {
    try {
        const nuevaTienda = new Tienda(req.body);
        await nuevaTienda.save();
        res.status(201).json(nuevaTienda);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las tiendas
exports.obtenerTiendas = async (req, res) => {
    try {
        const tiendas = await Tienda.find().populate('id_ciudad id_empresa empleados productos'); // Poblamos las referencias
        res.status(200).json(tiendas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una tienda por ID
exports.obtenerTiendaPorId = async (req, res) => {
    try {
        const tienda = await Tienda.findById(req.params.id).populate('id_ciudad id_empresa empleados productos');
        if (!tienda) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.status(200).json(tienda);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una tienda por ID
exports.actualizarTienda = async (req, res) => {
    try {
        const tiendaActualizada = await Tienda.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tiendaActualizada) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.status(200).json(tiendaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una tienda por ID
exports.eliminarTienda = async (req, res) => {
    try {
        const tiendaEliminada = await Tienda.findByIdAndDelete(req.params.id);
        if (!tiendaEliminada) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.status(200).json({ message: 'Tienda eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
