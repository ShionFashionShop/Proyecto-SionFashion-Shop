const mongoose = require('mongoose');
const Tienda = require('../models/tienda'); // Ajusta la ruta según tu estructura
const Ciudad = require('../models/ciudade'); // Modelo de ciudades
const Empresa = require('../models/empresa'); // Modelo de empresas

// Semilla de Tiendas
const tiendasData = [
    {
        nombre_tienda: "Tienda Electrónica",
        telefono_tienda: "+123456789",
        ubicacion_tienda: "Calle Electrónica 123",
        id_ciudad: new mongoose.Types.ObjectId(), // ID temporal de la ciudad
        id_empresa: new mongoose.Types.ObjectId(), // ID temporal de la empresa
        empleados: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()], // IDs temporales de los empleados
        productos: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] // IDs temporales de los productos
    },
    {
        nombre_tienda: "Ropa y Moda",
        telefono_tienda: "+987654321",
        ubicacion_tienda: "Avenida Moda 456",
        id_ciudad: new mongoose.Types.ObjectId(), // ID temporal de la ciudad
        id_empresa: new mongoose.Types.ObjectId(), // ID temporal de la empresa
        empleados: [], // Puede ser vacío si no hay empleados asociados inicialmente
        productos: [] // Puede ser vacío si no hay productos asociados inicialmente
    },
    {
        nombre_tienda: "Supermercado Central",
        telefono_tienda: "+456789123",
        ubicacion_tienda: "Calle Central 789",
        id_ciudad: new mongoose.Types.ObjectId(), // ID temporal de la ciudad
        id_empresa: new mongoose.Types.ObjectId(), // ID temporal de la empresa
        empleados: [new mongoose.Types.ObjectId()], // ID temporal de un empleado
        productos: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] // IDs temporales de los productos
    }
];

async function seedTiendas() {
    console.log('Iniciando la siembra de tiendas...');
    try {
        for (const tienda of tiendasData) {
            // Verificar si la ciudad referenciada existe
            const ciudadExistente = await Ciudad.findById(tienda.id_ciudad);

            // Verificar si la empresa referenciada existe
            const empresaExistente = await Empresa.findById(tienda.id_empresa);

            // Si la ciudad o la empresa no existen, informar y omitir
            if (!ciudadExistente) {
                console.log(`La ciudad referenciada no fue encontrada para la tienda: ${tienda.nombre_tienda}. Se omitirá esta tienda.`);
                continue;
            }

            if (!empresaExistente) {
                console.log(`La empresa referenciada no fue encontrada para la tienda: ${tienda.nombre_tienda}. Se omitirá esta tienda.`);
                continue;
            }

            // Crear la nueva tienda
            const nuevaTienda = await Tienda.create({
                nombre_tienda: tienda.nombre_tienda,
                telefono_tienda: tienda.telefono_tienda,
                ubicacion_tienda: tienda.ubicacion_tienda,
                id_ciudad: tienda.id_ciudad,
                id_empresa: tienda.id_empresa,
                empleados: tienda.empleados,
                productos: tienda.productos
            });

            console.log(`Tienda creada con éxito: ${nuevaTienda.nombre_tienda}.`);
        }
        console.log('Semillas de tiendas completadas.');
    } catch (err) {
        console.error('Error al crear semillas de tiendas:', err);
    }
}

module.exports = seedTiendas;
