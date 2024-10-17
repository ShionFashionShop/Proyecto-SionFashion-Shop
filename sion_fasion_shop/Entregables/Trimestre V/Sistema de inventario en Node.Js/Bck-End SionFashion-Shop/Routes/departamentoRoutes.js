const express = require('express');
const router = express.Router();
const departamentoController = require('../Controladores/departamentoController');


/**
 * @swagger
 * tags:
 *   name: Departamentos
 *   description: API para la gestión de departamentos
 */

/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     summary: Crear un nuevo departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_departamento:
 *                 type: string
 *                 description: Nombre del departamento
 *               id_pais:
 *                 type: string
 *                 description: ID del país al que pertenece
 *               ciudades:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs de las ciudades asociadas al departamento
 *             example:
 *               nombre_departamento: "Antioquia"
 *               id_pais: "5f8d04f94b5d5b0017a9a879"
 *               ciudades: ["5f8d04f94b5d5b0017a9a880", "5f8d04f94b5d5b0017a9a881"]
 *     responses:
 *       201:
 *         description: Departamento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       400:
 *         description: Error en la creación del departamento
 */

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: Lista de todos los departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departamento'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/departamentos/{id}:
 *   get:
 *     summary: Obtener un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/departamentos/{id}:
 *   put:
 *     summary: Actualizar un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_departamento:
 *                 type: string
 *               id_pais:
 *                 type: string
 *               ciudades:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Departamento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departamento'
 *       400:
 *         description: Error en la actualización del departamento
 *       404:
 *         description: Departamento no encontrado
 */

/**
 * @swagger
 * /api/departamentos/{id}:
 *   delete:
 *     summary: Eliminar un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Departamento eliminado correctamente
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Departamento:
 *       type: object
 *       required:
 *         - nombre_departamento
 *         - id_pais
 *       properties:
 *         id:
 *           type: string
 *           description: ID del departamento
 *         nombre_departamento:
 *           type: string
 *           description: Nombre del departamento
 *         id_pais:
 *           type: string
 *           description: ID del país asociado al departamento
 *         ciudades:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de las ciudades asociadas
 *       example:
 *         id: "60b8d1f8d1f8f8f8f8f8f8f8"
 *         nombre_departamento: "Antioquia"
 *         id_pais: "5f8d04f94b5d5b0017a9a879"
 *         ciudades: ["5f8d04f94b5d5b0017a9a880", "5f8d04f94b5d5b0017a9a881"]
 */


// Ruta para crear un nuevo departamento
router.post('/departamentos', departamentoController.crearDepartamento);

// Ruta para obtener todos los departamentos
router.get('/departamentos', departamentoController.obtenerDepartamentos);

// Ruta para obtener un departamento por ID
router.get('/departamentos/:id', departamentoController.obtenerDepartamentoPorId);

// Ruta para actualizar un departamento por ID
router.put('/departamentos/:id', departamentoController.actualizarDepartamento);

// Ruta para eliminar un departamento por ID
router.delete('/departamentos/:id', departamentoController.eliminarDepartamento);

module.exports = router;
