const mongoose = require('mongoose');
const Ciudade = require('../models/ciudade'); // Ajusta la ruta según tu estructura
const Empleado = require('../models/empleado'); // Modelo empleado
const Departamento = require('../models/departamento'); // Modelo departamento
const Proveedor = require('../models/proveedor'); // Modelo proveedor
const Tienda = require('../models/tienda'); // Modelo tienda

// Semilla de Ciudades
const ciudadesData = [
    {
        nombre_ciudad: "Bogotá",
        empleados: ["Juan Perez", "Ana Gómez"], // Nombres de empleados a asociar
        departamento: "Cundinamarca", // Nombre del departamento a asociar
        proveedores: ["Proveedor 1", "Proveedor 2"], // Nombres de proveedores
        tienda: ["Tienda 1", "Tienda 2"] // Nombres de tiendas
    },
    {
        nombre_ciudad: "Medellín",
        empleados: ["Carlos García", "Lucía Martinez"],
        departamento: "Antioquia",
        proveedores: ["Proveedor 3"],
        tienda: ["Tienda 3"]
    }
];

async function seedCiudades() {
    console.log('Iniciando la siembra de ciudades...');
    try {
        for (const ciudadData of ciudadesData) {
            // Buscar si la ciudad ya existe
            const ciudadExistente = await Ciudade.findOne({ nombre_ciudad: ciudadData.nombre_ciudad });
            console.log(`Buscando ciudad: ${ciudadData.nombre_ciudad}`);
            
            if (!ciudadExistente) {
                // Buscar empleados por nombre
                const empleadoIds = [];
                for (const empleadoNombre of ciudadData.empleados) {
                    const empleado = await Empleado.findOne({ nombre_empleado: empleadoNombre });
                    if (empleado) {
                        empleadoIds.push(empleado._id);
                    } else {
                        console.log(`Empleado "${empleadoNombre}" no encontrado.`);
                    }
                }

                // Buscar departamento por nombre
                const departamento = await Departamento.findOne({ nombre_departamento: ciudadData.departamento });
                if (!departamento) {
                    console.log(`Departamento "${ciudadData.departamento}" no encontrado.`);
                    continue; // Saltar la creación si no se encuentra el departamento
                }

                // Buscar proveedores por nombre
                const proveedorIds = [];
                for (const proveedorNombre of ciudadData.proveedores) {
                    const proveedor = await Proveedor.findOne({ nombre_proveedor: proveedorNombre });
                    if (proveedor) {
                        proveedorIds.push(proveedor._id);
                    } else {
                        console.log(`Proveedor "${proveedorNombre}" no encontrado.`);
                    }
                }

                // Buscar tiendas por nombre
                const tiendaIds = [];
                for (const tiendaNombre of ciudadData.tienda) {
                    const tienda = await Tienda.findOne({ nombre_tienda: tiendaNombre });
                    if (tienda) {
                        tiendaIds.push(tienda._id);
                    } else {
                        console.log(`Tienda "${tiendaNombre}" no encontrada.`);
                    }
                }

                // Crear la nueva ciudad con las referencias
                await Ciudade.create({
                    nombre_ciudad: ciudadData.nombre_ciudad,
                    empleados: empleadoIds,
                    id_departamentoNavigation: departamento._id,
                    proveedores: proveedorIds,
                    tienda: tiendaIds
                });
                console.log(`Ciudad "${ciudadData.nombre_ciudad}" creada.`);
            } else {
                console.log(`Ciudad "${ciudadData.nombre_ciudad}" ya existe.`);
            }
        }
        console.log('Semillas de ciudades completadas.');
    } catch (err) {
        console.error('Error al crear semillas de ciudades:', err);
    }
}

module.exports = seedCiudades;
