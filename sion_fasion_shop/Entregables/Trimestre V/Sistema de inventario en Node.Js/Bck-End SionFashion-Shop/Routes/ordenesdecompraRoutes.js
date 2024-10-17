const express = require('express');
const router = express.Router();
const ordenesDeCompraController = require('../Controladores/ordenesdecompraController'); // Asegúrate de que la ruta sea correcta

/**
 * @swagger
 * tags:
 *   name: OrdenesDeCompra
 *   description: API para gestionar las órdenes de compra
 */

/**
 * @swagger
 * /api/ordenesDeCompra:
 *   post:
 *     summary: Crear una nueva orden de compra
 *     tags: [OrdenesDeCompra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: string
 *                 description: ID del cliente asociado
 *               id_factura:
 *                 type: string
 *                 description: ID de la factura asociada
 *               id_empleado:
 *                 type: string
 *                 description: ID del empleado asociado
 *               ordenes_productos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de productos de la orden
 *             required:
 *               - id_cliente
 *               - id_factura
 *               - id_empleado
 *               - ordenes_productos
 *     responses:
 *       201:
 *         description: Orden de compra creada exitosamente
 *       400:
 *         description: Error en la creación de la orden
 */
router.post('/ordenesDeCompra', ordenesDeCompraController.crearOrdenDeCompra);

/**
 * @swagger
 * /api/ordenesDeCompra:
 *   get:
 *     summary: Obtener todas las órdenes de compra
 *     tags: [OrdenesDeCompra]
 *     responses:
 *       200:
 *         description: Lista de órdenes de compra
 *       500:
 *         description: Error al obtener las órdenes de compra
 */
router.get('/ordenesDeCompra', ordenesDeCompraController.obtenerOrdenesDeCompra);

/**
 * @swagger
 * /api/ordenesDeCompra/{id}:
 *   get:
 *     summary: Obtener una orden de compra por ID
 *     tags: [OrdenesDeCompra]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden de compra
 *     responses:
 *       200:
 *         description: Orden de compra encontrada
 *       404:
 *         description: Orden de compra no encontrada
 *       500:
 *         description: Error al obtener la orden de compra
 */
router.get('/ordenesDeCompra/:id', ordenesDeCompraController.obtenerOrdenDeCompraPorId);

/**
 * @swagger
 * /api/ordenesDeCompra/{id}:
 *   put:
 *     summary: Actualizar una orden de compra por ID
 *     tags: [OrdenesDeCompra]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden de compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cliente:
 *                 type: string
 *                 description: ID del cliente asociado
 *               id_factura:
 *                 type: string
 *                 description: ID de la factura asociada
 *               id_empleado:
 *                 type: string
 *                 description: ID del empleado asociado
 *               ordenes_productos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de productos de la orden
 *     responses:
 *       200:
 *         description: Orden de compra actualizada exitosamente
 *       404:
 *         description: Orden de compra no encontrada
 *       400:
 *         description: Error en la actualización de la orden
 */
router.put('/ordenesDeCompra/:id', ordenesDeCompraController.actualizarOrdenDeCompra);

/**
 * @swagger
 * /api/ordenesDeCompra/{id}:
 *   delete:
 *     summary: Eliminar una orden de compra por ID
 *     tags: [OrdenesDeCompra]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la orden de compra
 *     responses:
 *       200:
 *         description: Orden de compra eliminada correctamente
 *       404:
 *         description: Orden de compra no encontrada
 *       500:
 *         description: Error al eliminar la orden de compra
 */
router.delete('/ordenesDeCompra/:id', ordenesDeCompraController.eliminarOrdenDeCompra);

module.exports = router;
