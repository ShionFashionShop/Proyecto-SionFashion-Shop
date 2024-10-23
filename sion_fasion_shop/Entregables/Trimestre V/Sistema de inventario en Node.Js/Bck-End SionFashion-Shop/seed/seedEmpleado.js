const mongoose = require('mongoose');
const Empleado = require('../models/empleado'); // Ajusta la ruta según tu estructura
const Tienda = require('../models/tienda'); // Modelo de tienda
const Ciudade = require('../models/ciudade'); // Modelo de ciudad

// Semilla de Empleados
const empleadosData = [
    {
        dni_empleado: "1234567890",
        nombres_empleado: "Juan",
        apellidos_empleado: "Pérez",
        telefono_empleado: "3001234567",
        email_empleado: "juan.perez@example.com",
        tienda: "Tienda A", // Nombre de la tienda a asociar
        ciudad: "Medellín" // Nombre de la ciudad a asociar
    },
    {
        dni_empleado: "9876543210",
        nombres_empleado: "Ana",
        apellidos_empleado: "Gómez",
        telefono_empleado: "3101234567",
        email_empleado: "ana.gomez@example.com",
        tienda: "Tienda B",
        ciudad: "Bogotá"
    }
];

async function seedEmpleados() {
    console.log('Iniciando la siembra de empleados...');
    try {
        for (const empleadoData of empleadosData) {
            // Buscar si el empleado ya existe por su DNI
            const empleadoExistente = await Empleado.findOne({ dni_empleado: empleadoData.dni_empleado });
            console.log(`Buscando empleado con DNI: ${empleadoData.dni_empleado}`);
            
            if (!empleadoExistente) {
                // Inicializar el objeto de datos del empleado
                const nuevoEmpleadoData = {
                    dni_empleado: empleadoData.dni_empleado,
                    nombres_empleado: empleadoData.nombres_empleado,
                    apellidos_empleado: empleadoData.apellidos_empleado,
                    telefono_empleado: empleadoData.telefono_empleado,
                    email_empleado: empleadoData.email_empleado,
                };

                // Buscar la tienda por su nombre
                const tienda = await Tienda.findOne({ nombre_tienda: empleadoData.tienda });
                if (tienda) {
                    nuevoEmpleadoData.id_tienda = tienda._id; // Asignar id_tienda si existe
                } else {
                    console.log(`Tienda "${empleadoData.tienda}" no encontrada. No se asignará referencia de tienda.`);
                }

                // Buscar la ciudad por su nombre
                const ciudad = await Ciudade.findOne({ nombre_ciudad: empleadoData.ciudad });
                if (ciudad) {
                    nuevoEmpleadoData.id_ciudad = ciudad._id; // Asignar id_ciudad si existe
                } else {
                    console.log(`Ciudad "${empleadoData.ciudad}" no encontrada. No se asignará referencia de ciudad.`);
                }

                // Crear el nuevo empleado
                await Empleado.create(nuevoEmpleadoData);
                console.log(`Empleado "${empleadoData.nombres_empleado} ${empleadoData.apellidos_empleado}" creado.`);
            } else {
                console.log(`Empleado con DNI "${empleadoData.dni_empleado}" ya existe.`);
            }
        }
        console.log('Semillas de empleados completadas.');
    } catch (err) {
        console.error('Error al crear semillas de empleados:', err);
    }
}

module.exports = seedEmpleados;
