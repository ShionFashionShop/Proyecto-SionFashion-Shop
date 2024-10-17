const express = require('express');
const router = express.Router();
const registroActividadController = require('../Controladores/registroactividadController');

// Rutas para los Registros de Actividad
/**
 * @swagger
 * tags:
 *   name: RegistroActividad
 *   description: API para gestionar los registros de actividad de los usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroActividad:
 *       type: object
 *       required:
 *         - id_usuario
 *         - actividad
 *         - fecha_actividad
 *       properties:
 *         id_usuario:
 *           type: string
 *           description: ID del usuario asociado con la actividad
 *         actividad:
 *           type: string
 *           description: Descripción de la actividad realizada por el usuario
 *         fecha_actividad:
 *           type: string
 *           format: date
 *           description: Fecha y hora en que se realizó la actividad
 *       example:
 *         id_usuario: "652f1f9d9a4c8f12c46d9d4e"
 *         actividad: "Usuario inició sesión en el sistema"
 *         fecha_actividad: "2024-10-12T14:48:00.000Z"
 */

/**
 * @swagger
 * /api/registro-actividad:
 *   post:
 *     summary: Crear un nuevo registro de actividad
 *     tags: [RegistroActividad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroActividad'
 *     responses:
 *       201:
 *         description: Registro de actividad creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroActividad'
 *       400:
 *         description: Error al crear el registro de actividad
 */
router.post('/registro-actividad', registroActividadController.crearRegistroActividad);

/**
 * @swagger
 * /api/registro-actividad:
 *   get:
 *     summary: Obtener todos los registros de actividad
 *     tags: [RegistroActividad]
 *     responses:
 *       200:
 *         description: Lista de registros de actividad
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RegistroActividad'
 *       500:
 *         description: Error al obtener los registros de actividad
 */
router.get('/registro-actividad', registroActividadController.obtenerRegistrosActividad);

/**
 * @swagger
 * /api/registro-actividad/{id}:
 *   get:
 *     summary: Obtener un registro de actividad por ID
 *     tags: [RegistroActividad]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de actividad
 *     responses:
 *       200:
 *         description: Registro de actividad encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroActividad'
 *       404:
 *         description: Registro de actividad no encontrado
 *       500:
 *         description: Error al obtener el registro de actividad
 */
router.get('/registro-actividad/:id', registroActividadController.obtenerRegistroActividadPorId);

/**
 * @swagger
 * /api/registro-actividad/{id}:
 *   put:
 *     summary: Actualizar un registro de actividad por ID
 *     tags: [RegistroActividad]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de actividad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistroActividad'
 *     responses:
 *       200:
 *         description: Registro de actividad actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistroActividad'
 *       404:
 *         description: Registro de actividad no encontrado
 *       400:
 *         description: Error al actualizar el registro de actividad
 */
router.put('/registro-actividad/:id', registroActividadController.actualizarRegistroActividad);

/**
 * @swagger
 * /api/registro-actividad/{id}:
 *   delete:
 *     summary: Eliminar un registro de actividad por ID
 *     tags: [RegistroActividad]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del registro de actividad
 *     responses:
 *       200:
 *         description: Registro de actividad eliminado exitosamente
 *       404:
 *         description: Registro de actividad no encontrado
 *       500:
 *         description: Error al eliminar el registro de actividad
 */
router.delete('/registro-actividad/:id', registroActividadController.eliminarRegistroActividad);

module.exports = router;
