const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Encriptación de contraseñas
const Usuario = require('../models/usuario'); // Ajusta la ruta según tu estructura
const Role = require('../models/role'); // Modelo de roles
const RegistroActividad = require('../models/registroActividad'); // Ajusta la ruta según tu estructura

// Semilla de Usuarios
const usuariosData = [
    {
        nombre_usuario: "adminUser",
        clave_usuario: "adminPassword123", // Contraseña a encriptar
        email: "admin.example@gmail.com", // El email es obligatorio
        roles: ["Administrador"], // Nombre del rol, lo buscaremos en la BD
        registros_actividades: [] // Puede ser vacío inicialmente
    },
    {
        nombre_usuario: "regularUser",
        clave_usuario: "userPassword456", // Contraseña a encriptar
        email: "regular.example@gmail.com", // El email es obligatorio
        roles: ["user"], // Nombre del rol, lo buscaremos en la BD
        registros_actividades: [] // Puede ser vacío inicialmente
    },
    {
        nombre_usuario: "guestUser",
        clave_usuario: "guestPassword789", // Contraseña a encriptar
        email: "guestUser.example@gmail.com", // El email es obligatorio
        roles: ["user"], // Usuario sin roles
        registros_actividades: [] // Puede ser vacío inicialmente
    }
];

async function seedUsuarios() {
    console.log('Iniciando la siembra de usuarios...');
    try {
        for (const usuario of usuariosData) {
            // Verificar y asignar roles existentes por nombre
            const rolesExistentes = await Role.find({ nombre: { $in: usuario.roles } });

            // Si no se encuentran roles, loguear y omitir
            if (rolesExistentes.length !== usuario.roles.length) {
                console.log(`Algunos roles no fueron encontrados para el usuario: ${usuario.nombre_usuario}. Se omitirá este usuario.`);
                continue;
            }

            // Encriptar la contraseña antes de almacenar el usuario
            const salt = await bcrypt.genSalt(10);
            const claveEncriptada = await bcrypt.hash(usuario.clave_usuario, salt);

            // Crear el nuevo usuario
            const nuevoUsuario = await Usuario.create({
                nombre_usuario: usuario.nombre_usuario,
                email: usuario.email, // Asegúrate de incluir el email
                clave_usuario: claveEncriptada, // Almacenar la contraseña encriptada
                roles: rolesExistentes.map(role => role._id), // Asociar los IDs de los roles
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
