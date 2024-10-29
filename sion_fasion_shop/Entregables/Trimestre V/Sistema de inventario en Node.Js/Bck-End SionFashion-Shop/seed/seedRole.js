const mongoose = require('mongoose');
const Role = require('../models/role'); // Ajusta la ruta según tu estructura
const Usuario = require('../models/usuario'); // Modelo de usuarios

// Semilla de Roles
const rolesData = [
    {
        nombre_rol: "admin",
        descripcion_rol: "Usuario con acceso completo a todas las funciones.",
        usuarios: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] // IDs temporales de usuarios
    },
    {
        nombre_rol: "user",
        descripcion_rol: "Usuario responsable de gestionar las ventas.",
        usuarios: [new mongoose.Types.ObjectId()] // ID temporal de un usuario
    },
    {
        nombre_rol: "Cliente",
        descripcion_rol: "Usuario que puede realizar compras.",
        usuarios: [new mongoose.Types.ObjectId()] // Puede ser vacío si no hay usuarios asociados al rol inicialmente
    }
];

async function seedRoles() {
    console.log('Iniciando la siembra de roles...');
    try {
        for (const role of rolesData) {
            // Verificar si los usuarios referenciados existen, omitiendo el chequeo si el array está vacío
            const usuariosExistentes = role.usuarios.length > 0 
                ? await Usuario.find({ _id: { $in: role.usuarios } }) 
                : [];

            // Si hay usuarios que no existen, informar y omitir
            if (usuariosExistentes.length < role.usuarios.length) {
                console.log(`Algunos usuarios referenciados no fueron encontrados para el rol: ${role.nombre_rol}. Se omitirá este rol.`);
                continue; // Salta al siguiente rol si no se encuentran todos los usuarios
            }

            // Crear el nuevo rol
            const nuevoRol = await Role.create({
                nombre_rol: role.nombre_rol,
                descripcion_rol: role.descripcion_rol,
                usuarios: role.usuarios.length > 0 ? role.usuarios : null // Asignar null si no hay usuarios
            });

            console.log(`Rol creado con éxito: ${nuevoRol.nombre_rol}.`);
        }
        console.log('Semillas de roles completadas.');
    } catch (err) {
        console.error('Error al crear semillas de roles:', err);
    }
}

module.exports = seedRoles;
