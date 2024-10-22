const mongoose = require('mongoose');
const AlertasStock = require('../models/alertasStock'); // Ajusta la ruta según tu estructura
const Producto = require('../models/producto'); // Para obtener la referencia de productos

// Semilla de Alertas de Stock
const alertasStockData = [
    {
        nivel_minimo: 10,
        fecha_alerta: new Date('2024-01-15'),
        nombreProducto: "Laptop Dell XPS 13" // Usamos el nombre para encontrar el producto
    },
    {
        nivel_minimo: 5,
        fecha_alerta: new Date('2024-02-10'),
        nombreProducto: "iPhone 14" // Usamos el nombre para encontrar el producto
    },
    {
        nivel_minimo: 15,
        fecha_alerta: new Date(2024-12-20),
        nombreProducto: "Audífonos Sony WH-1000XM4"
    }
];

async function seedAlertasStock() {
    console.log('Iniciando la siembra de alertas de stock...');
    try {
        for (const alertaData of alertasStockData) {
            // Buscar el producto por nombre
            const producto = await Producto.findOne({ nombre: alertaData.nombreProducto });
            if (producto) {
                const alertaExistente = await AlertasStock.findOne({ id_productoNavigation: producto._id });
                console.log(`Buscando alerta de stock para el producto: ${alertaData.nombreProducto}`);
                if (!alertaExistente) {
                    // Crear la alerta de stock asociada al producto
                    await AlertasStock.create({
                        nivel_minimo: alertaData.nivel_minimo,
                        fecha_alerta: alertaData.fecha_alerta,
                        id_productoNavigation: producto._id
                    });
                    console.log(`Alerta de stock creada para el producto "${alertaData.nombreProducto}".`);
                } else {
                    console.log(`Alerta de stock para el producto "${alertaData.nombreProducto}" ya existe.`);
                }
            } else {
                console.log(`Producto "${alertaData.nombreProducto}" no encontrado.`);
            }
        }
        console.log('Semillas de alertas de stock completadas.');
    } catch (err) {
        console.error('Error al crear semillas de alertas de stock:', err);
    }
}

module.exports = seedAlertasStock;
