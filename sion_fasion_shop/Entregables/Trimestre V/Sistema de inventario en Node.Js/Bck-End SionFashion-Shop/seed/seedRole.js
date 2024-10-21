const mongoose = require('mongoose');
const Role = require('../models/role'); // Ajusta la ruta según tu estructura
const Usuario = require('../models/usuario'); // Modelo de usuarios

// Semilla de Roles
const rolesData = [
    {
        nombre_rol: "Administrador",
        descripcion_rol: "Usuario con acceso completo a todas las funciones.",
        usuarios: ["Usuario_ID_1", "Usuario_ID_2"] // Cambiar por los IDs correctos de los usuarios
    },
    {
        nombre_rol: "Vendedor",
        descripcion_rol: "Usuario responsable de gestionar las ventas.",
        usuarios: ["Usuario_ID_3"] // Cambiar por el ID correcto del usuario
    },
    {
        nombre_rol: "Cliente",
        descripcion_rol: "Usuario que puede realizar compras.",
        usuarios: [] // Puede ser vacío si no hay usuarios asociados al rol inicialmente
    }
];

async function seedRoles() {
    console.log('Iniciando la siembra de roles...');
    try {
        for (const role of rolesData) {
            // Verificar si los usuarios referenciados existen
            const usuariosExistentes = await Usuario.find({ _id: { $in: role.usuarios } });

            // Si hay usuarios que no existen, informar y omitir
            if (usuariosExistentes.length < role.usuarios.length) {
                console.log(`Algunos usuarios referenciados no fueron encontrados para el rol: ${role.nombre_rol}. Se omitirá este rol.`);
                continue; // Salta al siguiente rol si no se encuentran todos los usuarios
            }

            // Crear el nuevo rol
            const nuevoRol = await Role.create({
                nombre_rol: role.nombre_rol,
                descripcion_rol: role.descripcion_rol,
                usuarios: role.usuarios
            });

            console.log(`Rol creado con éxito: ${nuevoRol.nombre_rol}.`);
        }
        console.log('Semillas de roles completadas.');
    } catch (err) {
        console.error('Error al crear semillas de roles:', err);
    }
}

module.exports = seedRoles;
