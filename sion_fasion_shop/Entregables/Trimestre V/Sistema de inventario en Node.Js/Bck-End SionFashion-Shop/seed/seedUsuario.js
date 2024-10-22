const mongoose = require('mongoose');
const Usuario = require('../models/usuario'); // Ajusta la ruta según tu estructura
const Role = require('../models/role'); // Modelo de roles
const RegistroActividad = require('../models/registroActividad'); // Ajusta la ruta según tu estructura

// Semilla de Usuarios
const usuariosData = [
    {
        nombre_usuario: "adminUser",
        clave_usuario: "adminPassword123", // Asegúrate de manejar la clave con seguridad en un entorno real
        roles: [new mongoose.Types.ObjectId()], // ID temporal del rol
        registros_actividades: [] // Puede ser vacío si no hay registros asociados inicialmente
    },
    {
        nombre_usuario: "regularUser",
        clave_usuario: "userPassword456", // Asegúrate de manejar la clave con seguridad en un entorno real
        roles: [new mongoose.Types.ObjectId()], // ID temporal del rol
        registros_actividades: [] // Puede ser vacío si no hay registros asociados inicialmente
    },
    {
        nombre_usuario: "guestUser",
        clave_usuario: "guestPassword789", // Asegúrate de manejar la clave con seguridad en un entorno real
        roles: [], // Puede ser vacío si el usuario no tiene roles asociados
        registros_actividades: [] // Puede ser vacío si no hay registros asociados inicialmente
    }
];

async function seedUsuarios() {
    console.log('Iniciando la siembra de usuarios...');
    try {
        for (const usuario of usuariosData) {
            // Verificar si los roles referenciados existen
            const rolesExistentes = await Role.find({ '_id': { $in: usuario.roles } });

            // Si alguno de los roles no existe, informar y omitir
            if (rolesExistentes.length !== usuario.roles.length) {
                console.log(`Algunos roles no fueron encontrados para el usuario: ${usuario.nombre_usuario}. Se omitirá este usuario.`);
                continue;
            }

            // Crear el nuevo usuario
            const nuevoUsuario = await Usuario.create({
                nombre_usuario: usuario.nombre_usuario,
                clave_usuario: usuario.clave_usuario, // Asegúrate de encriptar la clave antes de almacenarla
                roles: usuario.roles,
                registros_actividades: usuario.registros_actividades
            });

            console.log(`Usuario creado con éxito: ${nuevoUsuario.nombre_usuario}.`);
        }
        console.log('Semillas de usuarios completadas.');
    } catch (err) {
        console.error('Error al crear semillas de usuarios:', err);
    }
}

module.exports = seedUsuarios;
