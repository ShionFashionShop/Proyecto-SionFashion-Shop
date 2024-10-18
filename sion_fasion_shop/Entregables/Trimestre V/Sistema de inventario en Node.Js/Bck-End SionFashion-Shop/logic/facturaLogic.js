const Factura = require('../models/factura'); // Asegúrate de que la ruta sea correcta

// Crear una nueva factura
const crearFactura = async (data) => {
    const nuevaFactura = new Factura(data);
    return await nuevaFactura.save();
};

// Obtener todas las facturas
const obtenerFacturas = async () => {
    return await Factura.find()
        .populate('id_clienteNavigation')
        .populate('metodos_de_pagos')
        .populate('ordenes_de_compras')
        .populate('productos');
};

// Obtener una factura por ID
const obtenerFacturaPorId = async (id) => {
    return await Factura.findById(id)
        .populate('id_clienteNavigation')
        .populate('metodos_de_pagos')
        .populate('ordenes_de_compras')
        .populate('productos');
};

// Actualizar una factura por ID
const actualizarFactura = async (id, data) => {
    return await Factura.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar una factura por ID
const eliminarFactura = async (id) => {
    return await Factura.findByIdAndDelete(id);
};

module.exports = {
    crearFactura,
    obtenerFacturas,
    obtenerFacturaPorId,
    actualizarFactura,
    eliminarFactura,
};
