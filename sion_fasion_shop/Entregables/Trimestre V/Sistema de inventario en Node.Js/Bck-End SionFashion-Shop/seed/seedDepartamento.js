const mongoose = require('mongoose');
const Departamento = require('../models/departamento'); // Ajusta la ruta según tu estructura
const Paise = require('../models/paise'); // Modelo de país
const Ciudade = require('../models/ciudade'); // Modelo de ciudad

// Semilla de Departamentos
const departamentosData = [
    {
        nombre_departamento: "Antioquia",
        pais: "Colombia", // Nombre del país a asociar
        ciudades: ["Medellín", "Envigado"] // Nombres de las ciudades a asociar
    },
    {
        nombre_departamento: "Cundinamarca",
        pais: "Colombia",
        ciudades: ["Bogotá", "Soacha"]
    }
];

async function seedDepartamentos() {
    console.log('Iniciando la siembra de departamentos...');
    try {
        for (const departamentoData of departamentosData) {
            // Buscar si el departamento ya existe
            const departamentoExistente = await Departamento.findOne({ nombre_departamento: departamentoData.nombre_departamento });
            console.log(`Buscando departamento: ${departamentoData.nombre_departamento}`);
            
            if (!departamentoExistente) {
                // Buscar el país por su nombre
                const pais = await Paise.findOne({ nombre_pais: departamentoData.pais });
                if (!pais) {
                    console.log(`País "${departamentoData.pais}" no encontrado.`);
                    continue;
                }

                // Buscar ciudades por nombre
                const ciudadIds = [];
                for (const ciudadNombre of departamentoData.ciudades) {
                    const ciudad = await Ciudade.findOne({ nombre_ciudad: ciudadNombre });
                    if (ciudad) {
                        ciudadIds.push(ciudad._id);
                    } else {
                        console.log(`Ciudad "${ciudadNombre}" no encontrada.`);
                    }
                }

                // Crear el nuevo departamento con las referencias
                await Departamento.create({
                    nombre_departamento: departamentoData.nombre_departamento,
                    id_pais: pais._id,
                    ciudades: ciudadIds
                });
                console.log(`Departamento "${departamentoData.nombre_departamento}" creado.`);
            } else {
                console.log(`Departamento "${departamentoData.nombre_departamento}" ya existe.`);
            }
        }
        console.log('Semillas de departamentos completadas.');
    } catch (err) {
        console.error('Error al crear semillas de departamentos:', err);
    }
}

module.exports = seedDepartamentos;
