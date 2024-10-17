const express = require('express');
const router = express.Router();
const inventarioController = require('../Controladores/inventarioController');

/**
 * @swagger
 * tags:
 *   name: Inventarios
 *   description: API para manejar el inventario
 */

/**
 * @swagger
 * /api/inventario:
 *   post:
 *     summary: Crear un nuevo registro de inventario
 *     tags: [Inventarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto:
 *                 type: string
 *                 example: "60f5b60f9c3d5e1f88f79c5f"
 *               cantidad:
 *                 type: integer
 *                 example: 100
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-17"
 *     responses:
 *       201:
 *         description: Registro de inventario creado correctamente.
 *       400:
 *         description: Error de validación.
 */

/**
 * @swagger
 * /api/inventario:
 *   get:
 *     summary: Obtener todos los registros de inventario
 *     tags: [Inventarios]
 *     responses:
 *       200:
 *         description: Lista de registros de inventario.
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /api/inventario/{id}:
 *   get:
 *     summary: Obtener un registro de inventario por ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del inventario a recuperar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de inventario encontrado.
 *       404:
 *         description: Registro no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /api/inventario/{id}:
 *   put:
 *     summary: Actualizar un registro de inventario por ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del inventario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto:
 *                 type: string
 *                 example: "60f5b60f9c3d5e1f88f79c5f"
 *               cantidad:
 *                 type: integer
 *                 example: 120
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *                 example: "2023-10-17"
 *     responses:
 *       200:
 *         description: Registro de inventario actualizado correctamente.
 *       404:
 *         description: Registro no encontrado.
 *       400:
 *         description: Error de validación.
 */

/**
 * @swagger
 * /api/inventario/{id}:
 *   delete:
 *     summary: Eliminar un registro de inventario por ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del inventario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro de inventario eliminado correctamente.
 *       404:
 *         description: Registro no encontrado.
 *       500:
 *         description: Error en el servidor.
 */



// Crear un nuevo registro de inventario
router.post('/inventario', inventarioController.crearInventario);

// Obtener todos los registros de inventario
router.get('/inventario', inventarioController.obtenerInventarios);

// Obtener un registro de inventario por ID
router.get('/inventario/:id', inventarioController.obtenerInventarioPorId);

// Actualizar un registro de inventario por ID
router.put('/inventario/:id', inventarioController.actualizarInventario);

// Eliminar un registro de inventario por ID
router.delete('/inventario/:id', inventarioController.eliminarInventario);

module.exports = router;
