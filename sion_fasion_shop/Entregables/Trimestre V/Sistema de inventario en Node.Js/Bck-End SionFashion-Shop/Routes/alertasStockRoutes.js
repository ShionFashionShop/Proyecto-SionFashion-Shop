const express = require('express');
const alertasStockController = require('../Controladores/alertasStockController.js');

const router = express.Router(); 

/**
 * @swagger
 * components:
 *   schemas:
 *     AlertaStock:
 *       type: object
 *       required:
 *         - nivel_minimo
 *         - fecha_alerta
 *         - id_productoNavigation
 *       properties:
 *         _id:
 *           type: string
 *           description: El ID auto-generado de la alerta
 *         nivel_minimo:
 *           type: number
 *           description: El nivel mínimo del stock para generar una alerta
 *         fecha_alerta:
 *           type: string
 *           format: date
 *           description: La fecha en que se genera la alerta
 *         id_productoNavigation:
 *           type: string
 *           description: El ID del producto relacionado
 *       example:
 *         _id: 60d5ec49f72a3f004568abc1
 *         nivel_minimo: 40
 *         fecha_alerta: 2024-10-11
 *         id_productoNavigation: 652c72a789b4b723ab12e8f7
 */

/**
 * @swagger
 * tags:
 *   name: Alertas de Stock
 *   description: API para gestionar alertas de stock
 */

/**
 * @swagger
 * /api/alertas:
 *   post:
 *     summary: Crea una nueva alerta de stock
 *     tags: [Alertas de Stock]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlertaStock'
 *     responses:
 *       200:
 *         description: Alerta de stock creada correctamente
 *       500:
 *         description: Error en la creación de la alerta de stock
 */
router.post('/alertas', alertasStockController.crearAlertaStock);

/**
 * @swagger
 * /api/alertas:
 *   get:
 *     summary: Obtiene todas las alertas de stock
 *     tags: [Alertas de Stock]
 *     responses:
 *       200:
 *         description: Lista de todas las alertas de stock
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AlertaStock'
 */
router.get('/alertas', alertasStockController.obtenerAlertasStock);

/**
 * @swagger
 * /api/alertas/{id}:
 *   get:
 *     summary: Obtiene una alerta de stock por su ID
 *     tags: [Alertas de Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la alerta de stock
 *     responses:
 *       200:
 *         description: Detalle de la alerta de stock por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlertaStock'
 *       404:
 *         description: Alerta de stock no encontrada
 */
router.get('/alertas/:id', alertasStockController.obtenerAlertaStockPorId);

/**
 * @swagger
 * /api/alertas/{id}:
 *   put:
 *     summary: Actualiza una alerta de stock por su ID
 *     tags: [Alertas de Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la alerta de stock
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlertaStock'
 *     responses:
 *       200:
 *         description: Alerta de stock actualizada correctamente
 *       404:
 *         description: Alerta de stock no encontrada
 *       500:
 *         description: Error al actualizar la alerta de stock
 */
router.put('/alertas/:id', alertasStockController.actualizarAlertaStock);

/**
 * @swagger
 * /api/alertas/{id}:
 *   delete:
 *     summary: Elimina una alerta de stock por su ID
 *     tags: [Alertas de Stock]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la alerta de stock
 *     responses:
 *       200:
 *         description: Alerta de stock eliminada correctamente
 *       404:
 *         description: Alerta de stock no encontrada
 *       500:
 *         description: Error al eliminar la alerta de stock
 */
router.delete('/alertas/:id', alertasStockController.eliminarAlertaStock);

module.exports = router;
