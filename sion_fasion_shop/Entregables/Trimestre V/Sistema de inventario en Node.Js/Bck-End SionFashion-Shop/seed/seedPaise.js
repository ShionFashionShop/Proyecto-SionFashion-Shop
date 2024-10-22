const mongoose = require('mongoose');
const Paise = require('../models/paise'); // Ajusta la ruta según tu estructura
const Departamento = require('../models/departamento'); // Modelo de departamentos

// Semilla de Países con ObjectId temporales
const paisesData = [
    {
        nombre_pais: "Colombia",
        departamentos: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] // IDs temporales de departamentos
    },
    {
        nombre_pais: "Argentina",
        departamentos: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] // IDs temporales de departamentos
    }
];

async function seedPaises() {
    console.log('Iniciando la siembra de países...');
    try {
        for (const pais of paisesData) {
            // Verificar si los departamentos existen
            const departamentos = await Departamento.find({ '_id': { $in: pais.departamentos } });
            if (departamentos.length !== pais.departamentos.length) {
                console.log(`Algunos departamentos no fueron encontrados para el país ${pais.nombre_pais}. Se omitirá este país.`);
                continue; // Salta al siguiente país si algunos departamentos no se encuentran
            }

            // Crear el nuevo registro de país
            await Paise.create({
                nombre_pais: pais.nombre_pais,
                departamentos: pais.departamentos
            });

            console.log(`País ${pais.nombre_pais} creado con éxito.`);
        }
        console.log('Semillas de países completadas.');
    } catch (err) {
        console.error('Error al crear semillas de países:', err);
    }
}

module.exports = seedPaises;
