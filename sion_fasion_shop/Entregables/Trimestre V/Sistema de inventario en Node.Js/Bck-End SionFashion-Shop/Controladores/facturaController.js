const Factura = require('../models/factura');

// Crear una nueva factura
exports.crearFactura = async (req, res) => {
    try {
        const nuevaFactura = new Factura(req.body);
        await nuevaFactura.save();
        res.status(201).json(nuevaFactura);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las facturas
exports.obtenerFacturas = async (req, res) => {
    try {
        const facturas = await Factura.find()
            .populate('id_clienteNavigation')
            .populate('metodos_de_pagos')
            .populate('ordenes_de_compras')
            .populate('productos');
        res.status(200).json(facturas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una factura por ID
exports.obtenerFacturaPorId = async (req, res) => {
    try {
        const factura = await Factura.findById(req.params.id)
            .populate('id_clienteNavigation')
            .populate('metodos_de_pagos')
            .populate('ordenes_de_compras')
            .populate('productos');
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
        const facturaActualizada = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const facturaEliminada = await Factura.findByIdAndDelete(req.params.id);
        if (!facturaEliminada) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Factura eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
