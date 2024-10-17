const express = require('express');
const router = express.Router();
const ciudadeController = require('../Controladores/ciudadeController');

/**
 * @swagger
 * tags:
 *   name: Ciudades
 *   description: Gestión de ciudades
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ciudad:
 *       type: object
 *       required:
 *         - nombre_ciudad
 *         - id_pais
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado de la ciudad
 *         nombre_ciudad:
 *           type: string
 *           description: Nombre de la ciudad
 *         id_pais:
 *           type: string
 *           description: ID del país al que pertenece la ciudad
 *         codigo_postal:
 *           type: string
 *           description: Código postal de la ciudad
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         nombre_ciudad: Bogotá
 *         id_pais: 60d0fe4f5311236168a109cb
 *         codigo_postal: 110111
 */

/**
 * @swagger
 * /api/ciudades:
 *   post:
 *     summary: Crear una nueva ciudad
 *     tags: [Ciudades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ciudad'
 *     responses:
 *       201:
 *         description: Ciudad creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ciudad'
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/ciudades:
 *   get:
 *     summary: Obtener todas las ciudades
 *     tags: [Ciudades]
 *     responses:
 *       200:
 *         description: Lista de todas las ciudades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ciudad'
 */

/**
 * @swagger
 * /api/ciudades/{id}:
 *   get:
 *     summary: Obtener una ciudad por ID
 *     tags: [Ciudades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Datos de la ciudad solicitada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ciudad'
 *       404:
 *         description: Ciudad no encontrada
 */

/**
 * @swagger
 * /api/ciudades/{id}:
 *   put:
 *     summary: Actualizar una ciudad por ID
 *     tags: [Ciudades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ciudad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ciudad'
 *     responses:
 *       200:
 *         description: Ciudad actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ciudad'
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Ciudad no encontrada
 */

/**
 * @swagger
 * /api/ciudades/{id}:
 *   delete:
 *     summary: Eliminar una ciudad por ID
 *     tags: [Ciudades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Ciudad eliminada exitosamente
 *       404:
 *         description: Ciudad no encontrada
 */

// Ruta para crear una nueva ciudad
router.post('/ciudades', ciudadeController.crearCiudad);

// Ruta para obtener todas las ciudades
router.get('/ciudades', ciudadeController.obtenerCiudades);

// Ruta para obtener una ciudad por ID
router.get('/ciudades/:id', ciudadeController.obtenerCiudadPorId);

// Ruta para actualizar una ciudad
router.put('/ciudades/:id', ciudadeController.actualizarCiudad);

// Ruta para eliminar una ciudad
router.delete('/ciudades/:id', ciudadeController.eliminarCiudad);

module.exports = router;
