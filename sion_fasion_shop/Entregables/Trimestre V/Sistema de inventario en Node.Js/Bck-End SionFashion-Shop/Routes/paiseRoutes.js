const express = require('express');
const router = express.Router();
const paiseController = require('../Controladores/paiseController');

// Rutas para los países
/**
 * @swagger
 * tags:
 *   name: Paises
 *   description: API para gestionar los países
 */

// Crear un nuevo país
/**
 * @swagger
 * /api/paises:
 *   post:
 *     summary: Crea un nuevo país
 *     tags: [Paises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del país
 *     responses:
 *       201:
 *         description: País creado exitosamente
 *       400:
 *         description: Error al crear el país
 */
router.post('/paises', paiseController.crearPaise);

// Obtener todos los países
/**
 * @swagger
 * /api/paises:
 *   get:
 *     summary: Obtiene todos los países
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Lista de todos los países
 *       500:
 *         description: Error al obtener los países
 */
router.get('/paises', paiseController.obtenerPaises);

// Obtener un país por ID
/**
 * @swagger
 * /api/paises/{id}:
 *   get:
 *     summary: Obtiene un país por ID
 *     tags: [Paises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del país
 *     responses:
 *       200:
 *         description: País obtenido exitosamente
 *       404:
 *         description: País no encontrado
 *       500:
 *         description: Error al obtener el país
 */
router.get('/paises/:id', paiseController.obtenerPaisePorId);

// Actualizar un país por ID
/**
 * @swagger
 * /api/paises/{id}:
 *   put:
 *     summary: Actualiza un país por ID
 *     tags: [Paises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del país
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del país
 *     responses:
 *       200:
 *         description: País actualizado exitosamente
 *       404:
 *         description: País no encontrado
 *       400:
 *         description: Error al actualizar el país
 */
router.put('/paises/:id', paiseController.actualizarPaise);

// Eliminar un país por ID
/**
 * @swagger
 * /api/paises/{id}:
 *   delete:
 *     summary: Elimina un país por ID
 *     tags: [Paises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del país
 *     responses:
 *       200:
 *         description: País eliminado correctamente
 *       404:
 *         description: País no encontrado
 *       500:
 *         description: Error al eliminar el país
 */
router.delete('/paises/:id', paiseController.eliminarPaise);

module.exports = router;
