const mongoose = require('mongoose');
const RegistroActividad = require('../models/registroActividad'); // Ajusta la ruta según tu estructura
const Usuario = require('../models/usuario'); // Modelo de usuarios
const { ObjectId } = mongoose.Types; // Para manejar ObjectId

// Semilla de Registros de Actividad
const registrosActividadData = [
    {
        id_usuario: new ObjectId(), // ID temporal si no hay un usuario asociado
        actividad: "Inicio de sesión en la aplicación",
        fecha_actividad: new Date('2024-10-01T08:30:00Z')
    },
    {
        id_usuario: new ObjectId(), // ID temporal si no hay un usuario asociado
        actividad: "Creación de un nuevo producto",
        fecha_actividad: new Date('2024-10-02T09:45:00Z')
    },
    {
        id_usuario: new ObjectId(), // ID temporal si no hay un usuario asociado
        actividad: "Actualización de perfil",
        fecha_actividad: new Date('2024-10-03T10:15:00Z')
    }
];

async function seedRegistrosActividad() {
    console.log('Iniciando la siembra de registros de actividad...');
    try {
        for (const registro of registrosActividadData) {
            // Verificar si la referencia de usuario existe
            const usuario = await Usuario.findById(registro.id_usuario);

            if (!usuario) {
                console.log(`El usuario referenciado no fue encontrado para la actividad: ${registro.actividad}, se usará el ObjectId temporal.`);
            }

            // Crear el nuevo registro de actividad
            await RegistroActividad.create({
                id_usuario: registro.id_usuario,
                actividad: registro.actividad,
                fecha_actividad: registro.fecha_actividad
            });

            console.log(`Registro de actividad creado con éxito: ${registro.actividad}.`);
        }
        console.log('Semillas de registros de actividad completadas.');
    } catch (err) {
        console.error('Error al crear semillas de registros de actividad:', err);
    }
}

module.exports = seedRegistrosActividad;
