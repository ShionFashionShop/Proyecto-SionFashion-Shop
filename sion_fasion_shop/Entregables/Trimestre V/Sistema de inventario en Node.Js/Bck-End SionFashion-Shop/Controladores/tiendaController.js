const Tienda = require('../models/tienda'); // Asegúrate de que la ruta sea correcta
const tiendasLogic = require('../logic/tiendasLogic'); // Ajusta la ruta según tu estructura

// Crear una nueva tienda
exports.crearTienda = async (req, res) => {
    try {
        const nuevaTienda = await tiendasLogic.crearTienda(req.body);
        res.status(201).json(nuevaTienda);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la tienda', error: error.message });
    }
};

// Obtener todas las tiendas
exports.obtenerTiendas = async (req, res) => {
    try {
        const tiendas = await tiendasLogic.obtenerTiendas();
        res.status(200).json(tiendas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tiendas', error: error.message });
    }
};

// Obtener una tienda por ID
exports.obtenerTiendaPorId = async (req, res) => {
    try {
        const tienda = await tiendasLogic.obtenerTiendaPorId(req.params.id);
        if (!tienda) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.status(200).json(tienda);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tienda', error: error.message });
    }
};

// Actualizar una tienda por ID
exports.actualizarTienda = async (req, res) => {
    try {
        const tiendaActualizada = await tiendasLogic.actualizarTienda(req.params.id, req.body);
        if (!tiendaActualizada) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.status(200).json(tiendaActualizada);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la tienda', error: error.message });
    }
};

// Eliminar una tienda por ID
exports.eliminarTienda = async (req, res) => {
    try {
        const tiendaEliminada = await tiendasLogic.eliminarTienda(req.params.id);
        if (!tiendaEliminada) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }
        res.status(200).json({ message: 'Tienda eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tienda', error: error.message });
    }
};
