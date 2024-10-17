const express = require('express');
const router = express.Router();
const roleController = require('../Controladores/rolesControlller');

// Rutas para los Roles
/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API para gestionar los roles
 */

// Definición del esquema para Role
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - nombre_rol
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID del rol
 *         nombre_rol:
 *           type: string
 *           description: El nombre del rol.
 *           example: "Administrador"
 *         descripcion_rol:
 *           type: string
 *           description: La descripción del rol.
 *           example: "Rol con acceso completo a la aplicación."
 *         usuarios:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: Array de IDs de usuarios asociados a este rol.
 */

// Crear un nuevo rol
/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Error al crear el rol
 */
router.post('/roles', roleController.crearRole);

// Obtener todos los roles
/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Error al obtener los roles
 */
router.get('/roles', roleController.obtenerRoles);

// Obtener un rol por ID
/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error al obtener el rol
 */
router.get('/roles/:id', roleController.obtenerRolePorId);

// Actualizar un rol por ID
/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rol no encontrado
 *       400:
 *         description: Error al actualizar el rol
 */
router.put('/roles/:id', roleController.actualizarRole);

// Eliminar un rol por ID
/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error al eliminar el rol
 */
router.delete('/roles/:id', roleController.eliminarRole);

module.exports = router;
