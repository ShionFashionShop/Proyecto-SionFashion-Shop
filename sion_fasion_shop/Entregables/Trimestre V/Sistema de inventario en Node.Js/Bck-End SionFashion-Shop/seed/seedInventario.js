const mongoose = require('mongoose');
const Inventario = require('../models/inventario'); // Ajusta la ruta según tu estructura
const Producto = require('../models/producto'); // Modelo de producto

// Semilla de Inventario con ObjectId temporal
const inventarioData = [
    {
        id_producto: new mongoose.Types.ObjectId(), // ID temporal
        stock_inicial: 100,
        stock_actual: 80,
        saldo: 80
    },
    {
        id_producto: new mongoose.Types.ObjectId(), // ID temporal
        stock_inicial: 200,
        stock_actual: 150,
        saldo: 150
    },
    {
        id_producto: new mongoose.Types.ObjectId(), // ID temporal
        stock_inicial: 300,
        stock_actual: 250,
        saldo: 250
    }
];

async function seedInventario() {
    console.log('Iniciando la siembra de inventario...');
    try {
        for (const inventario of inventarioData) {
            // Buscar si el producto existe
            const producto = await Producto.findById(inventario.id_producto);
            if (producto) {
                // Crear el nuevo registro de inventario
                await Inventario.create({
                    id_producto: producto._id,
                    stock_inicial: inventario.stock_inicial,
                    stock_actual: inventario.stock_actual,
                    saldo: inventario.saldo
                });
                console.log(`Inventario creado para el producto ${inventario.id_producto}.`);
            } else {
                console.log(`Producto con ID ${inventario.id_producto} no encontrado. No se creará el inventario.`);
            }
        }
        console.log('Semillas de inventario completadas.');
    } catch (err) {
        console.error('Error al crear semillas de inventario:', err);
    }
}

module.exports = seedInventario;
