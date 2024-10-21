const mongoose = require('mongoose');
const Empresa = require('../models/empresa'); // Ajusta la ruta según tu estructura
const Tienda = require('../models/tienda'); // Modelo de tienda

// Semilla de Empresas
const empresasData = [
    {
        nombre_empresa: "Empresa A",
        direccion_empresa: "Calle 123, Ciudad A",
        telefono_empresa: "3001234567",
        email_empresa: "contacto@empresaA.com",
        tiendas: ["Tienda A", "Tienda B"] // Nombres de las tiendas a asociar
    },
    {
        nombre_empresa: "Empresa B",
        direccion_empresa: "Calle 456, Ciudad B",
        telefono_empresa: "3101234567",
        email_empresa: "contacto@empresaB.com",
        tiendas: ["Tienda C"]
    }
];

async function seedEmpresas() {
    console.log('Iniciando la siembra de empresas...');
    try {
        for (const empresaData of empresasData) {
            // Buscar si la empresa ya existe por su nombre
            const empresaExistente = await Empresa.findOne({ nombre_empresa: empresaData.nombre_empresa });
            console.log(`Buscando empresa: ${empresaData.nombre_empresa}`);
            
            if (!empresaExistente) {
                // Crear un arreglo para almacenar las referencias de las tiendas
                const tiendaIds = [];

                for (const tiendaNombre of empresaData.tiendas) {
                    // Buscar la tienda por su nombre
                    const tienda = await Tienda.findOne({ nombre_tienda: tiendaNombre });
                    if (!tienda) {
                        console.log(`Tienda "${tiendaNombre}" no encontrada. Creando nueva...`);
                        const nuevaTienda = await Tienda.create({ nombre_tienda: tiendaNombre });
                        tiendaIds.push(nuevaTienda._id);
                        console.log(`Tienda "${tiendaNombre}" creada.`);
                    } else {
                        tiendaIds.push(tienda._id);
                        console.log(`Tienda "${tiendaNombre}" ya existe.`);
                    }
                }

                // Crear la nueva empresa con las referencias de tienda
                await Empresa.create({
                    nombre_empresa: empresaData.nombre_empresa,
                    direccion_empresa: empresaData.direccion_empresa,
                    telefono_empresa: empresaData.telefono_empresa,
                    email_empresa: empresaData.email_empresa,
                    tienda: tiendaIds
                });
                console.log(`Empresa "${empresaData.nombre_empresa}" creada.`);
            } else {
                console.log(`Empresa "${empresaData.nombre_empresa}" ya existe.`);
            }
        }
        console.log('Semillas de empresas completadas.');
    } catch (err) {
        console.error('Error al crear semillas de empresas:', err);
    }
}

module.exports = seedEmpresas;
