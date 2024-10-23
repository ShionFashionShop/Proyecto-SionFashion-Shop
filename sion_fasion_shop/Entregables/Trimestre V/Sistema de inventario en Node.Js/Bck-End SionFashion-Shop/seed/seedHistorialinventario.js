const mongoose = require('mongoose');
const HistorialInventario = require('../models/historialInventario'); // Ajusta la ruta según tu estructura
const Producto = require('../models/producto'); // Modelo de producto

// Semilla de Historial de Inventario con ObjectId temporal
const historialInventarioData = [
    {
        id_producto: new mongoose.Types.ObjectId(), // ID temporal
        cantidad: 50,
        tipo_cambio: "entrada",
        fecha_cambio: new Date('2024-01-01')
    },
    {
        id_producto: new mongoose.Types.ObjectId(), // ID temporal
        cantidad: 30,
        tipo_cambio: "salida",
        fecha_cambio: new Date('2024-01-10')
    },
    {
        id_producto: new mongoose.Types.ObjectId(), // ID temporal
        cantidad: 20,
        tipo_cambio: "entrada",
        fecha_cambio: new Date('2024-01-15')
    }
];

async function seedHistorialInventario() {
    console.log('Iniciando la siembra de historial de inventario...');
    try {
        for (const historialData of historialInventarioData) {
            // Buscar si el producto existe
            const producto = await Producto.findById(historialData.id_producto);
            if (producto) {
                // Crear el nuevo historial de inventario
                await HistorialInventario.create({
                    id_producto: producto._id,
                    cantidad: historialData.cantidad,
                    tipo_cambio: historialData.tipo_cambio,
                    fecha_cambio: historialData.fecha_cambio
                });
                console.log(`Historial de inventario creado para el producto ${historialData.id_producto}.`);
            } else {
                console.log(`Producto con ID ${historialData.id_producto} no encontrado. No se creará el historial.`);
            }
        }
        console.log('Semillas de historial de inventario completadas.');
    } catch (err) {
        console.error('Error al crear semillas de historial de inventario:', err);
    }
}

module.exports = seedHistorialInventario;
