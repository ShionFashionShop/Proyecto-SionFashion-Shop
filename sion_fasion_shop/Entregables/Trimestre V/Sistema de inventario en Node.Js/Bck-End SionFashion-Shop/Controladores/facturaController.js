const Factura = require('../models/factura');
const facturaLogic = require('../logic/facturaLogic'); // Asegúrate de ajustar la ruta según tu estructura

// Crear una nueva factura
exports.crearFactura = async (req, res) => {
    try {
        const nuevaFactura = await facturaLogic.crearFactura(req.body);
        res.status(201).json(nuevaFactura);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las facturas
exports.obtenerFacturas = async (req, res) => {
    try {
        const facturas = await facturaLogic.obtenerFacturas();
        res.status(200).json(facturas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una factura por ID
exports.obtenerFacturaPorId = async (req, res) => {
    try {
        const factura = await facturaLogic.obtenerFacturaPorId(req.params.id);
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.status(200).json(factura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una factura por ID
exports.actualizarFactura = async (req, res) => {
    try {
        const facturaActualizada = await facturaLogic.actualizarFactura(req.params.id, req.body);
        if (!facturaActualizada) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.status(200).json(facturaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una factura por ID
exports.eliminarFactura = async (req, res) => {
    try {
        const facturaEliminada = await facturaLogic.eliminarFactura(req.params.id);
        if (!facturaEliminada) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Factura eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
