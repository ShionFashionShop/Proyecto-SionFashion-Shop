const express = require('express');
const router = express.Router();
const usuarioController = require('../Controladores/usuarioController');
const Usuario = require('../models/usuario.js');
const jwt = require('jsonwebtoken'); // Asegúrate de tener esto instalado
const { body } = require('express-validator');
const { registrarUsuario } = require('../Controladores/usuarioController'); // Asegúrate de ajustar la ruta correctamente
const { iniciarSesion } = require('../Controladores/usuarioController');


/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para gestionar los usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre_usuario
 *         - clave_usuario
 *         - roles
 *       properties:
 *         _id:
 *           type: string
 *           description: ID generado automáticamente por MongoDB.
 *         nombre_usuario:
 *           type: string
 *           description: Nombre del usuario.
 *           example: "sion_user"
 *         clave_usuario:
 *           type: string
 *           description: Clave del usuario.
 *           example: "password123"
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs de los roles del usuario.
 *         registros_actividades:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs de los registros de actividades del usuario.
 *       example:
 *         nombre_usuario: "sion_user"
 *         clave_usuario: "password123"
 *         roles:
 *           - 617c1f1d3b148b6e46f1010d
 *         registros_actividades:
 *           - 617c1f1d3b148b6e46f1010e
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error al crear el usuario
 */
router.post('/usuarios', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get('/usuarios', usuarioController.obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error al actualizar el usuario
 */
router.put('/usuarios/:id', usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicia sesión con email y contraseña.
 *     tags: [Auth]
 *     description: Permite a un usuario autenticarse utilizando su email y contraseña para recibir un token JWT y su rol.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario.
 *                 example: "usuario@example.com"
 *               clave_usuario:
 *                 type: string
 *                 description: La contraseña del usuario.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa, devuelve el token JWT y el rol del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: El estado de la autenticación.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: El token JWT del usuario autenticado.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjNjOWViNWU2MGM0YjAzMzVlNGEyOSIsImVtYWlsIjoiamhvbmRhemFAZ21haWwuY29tIiwiaWF0IjoxNzMxNDQ2NDE1LCJleHAiOjE3MzE0NTAwMTV9.XlQZNkbNsL1xAlG5SRBL41mCbYQNn147eoxC0rHXEnU"
 *                 role:
 *                   type: string
 *                   description: El rol del usuario (por ejemplo, 'admin', 'usuario').
 *                   example: "admin"
 *       400:
 *         description: Credenciales inválidas (usuario no encontrado o contraseña incorrecta).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: El estado de la autenticación.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: El mensaje de error.
 *                   example: "Contraseña incorrecta"
 *       404:
 *         description: Usuario no encontrado con el email proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: El estado de la autenticación.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: El mensaje de error.
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: El estado de la autenticación.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: El mensaje de error.
 *                   example: "Error al iniciar sesión"
 */

// Ruta de inicio de sesión
router.post('/login', iniciarSesion);


/**
 * @swagger
 * /api/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Esta ruta permite registrar un nuevo usuario proporcionando su nombre, correo y clave de usuario.
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: juan.perez@correo.com
 *               clave_usuario:
 *                 type: string
 *                 description: Clave del usuario (mínimo 8 caracteres)
 *                 example: clave1234
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Usuario registrado con éxito
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     nombre_usuario:
 *                       type: string
 *                       example: Juan Perez
 *                     email:
 *                       type: string
 *                       example: juan.perez@correo.com
 *                     clave_usuario:
 *                       type: string
 *                       example: clave1234
 *       400:
 *         description: El correo electrónico ya está en uso o hay algún error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: El correo electrónico ya está en uso
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error en el servidor
 */


// Ruta para registrar un usuario
router.post('/registro',
    [
        // Validaciones con express-validator
        body('nombre_usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
        body('email', 'Por favor ingrese un correo válido').isEmail(),
        body('clave_usuario', 'La clave de usuario debe tener al menos 8 caracteres').isLength({ min: 8 }),
    ],
    registrarUsuario
);


module.exports = router;
