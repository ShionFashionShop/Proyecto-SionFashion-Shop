const express = require('express');
const router = express.Router();
const usuarioController = require('../Controladores/usuarioController');
const Usuario = require ('../models/usuario.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Asegúrate de tener esto instalado


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
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - clave_usuario
 *             properties:
 *               email:
 *                 type: string
 *                 description: El email del usuario
 *                 example: ejemplo@dominio.com
 *               clave_usuario:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: ContraseñaSegura123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: El token JWT que se envía al cliente
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */

router.post('/login', async (req, res) => {
    const { email, clave_usuario } = req.body;

    try {
        // Buscar el usuario por email
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        // Verificar la contraseña sin encriptación
        if (clave_usuario !== user.clave_usuario) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        // Crear un token JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Expira en 1 hora
        });

        // Enviar el token al cliente
        res.json({ success: true, token });
    } catch (err) {
        console.error('Error durante el inicio de sesión:', err);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});



module.exports = router;
