const express = require('express');
const router = express.Router();
const ordenesProductoController = require('../Controladores/ordenesproductoController');

// Rutas para las órdenes de producto
/**
 * @swagger
 * tags:
 *   name: OrdenesProducto
 *   description: API para gestionar las órdenes de productos
 */

// Crear una nueva orden de producto
/**
 * @swagger
 * /api/ordenes-producto:
 *   post:
 *     summary: Crea una nueva orden de producto
 *     tags: [OrdenesProducto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_orden_compra:
 *                 type: string
 *                 description: ID de la orden de compra
 *               id_producto:
 *                 type: string
 *                 description: ID del producto
 *               cantidad:
 *                 type: number
 *                 description: Cantidad del producto ordenado
 *     responses:
 *       201:
 *         description: Orden de producto creada exitosamente
 *       400:
 *         description: Error al crear la orden de producto
 */
router.post('/ordenes-producto', ordenesProductoController.crearOrdenDeProducto);

// Obtener todas las órdenes de producto
/**
 * @swagger
 * /api/ordenes-producto:
 *   get:
 *     summary: Obtiene todas las órdenes de producto
 *     tags: [OrdenesProducto]
 *     responses:
 *       200:
 *         description: Lista de todas las órdenes de producto
 *       500:
 *         description: Error al obtener las órdenes de producto
 */
router.get('/ordenes-producto', ordenesProductoController.obtenerOrdenesProducto);

// Obtener una orden de producto por ID
/**
 * @swagger
 * /api/ordenes-producto/{id}:
 *   get:
 *     summary: Obtiene una orden de producto por ID
 *     tags: [OrdenesProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden de producto
 *     responses:
 *       200:
 *         description: Orden de producto obtenida exitosamente
 *       404:
 *         description: Orden de producto no encontrada
 *       500:
 *         description: Error al obtener la orden de producto
 */
router.get('/ordenes-producto/:id', ordenesProductoController.obtenerOrdenDeProductoPorId);

// Actualizar una orden de producto por ID
/**
 * @swagger
 * /api/ordenes-producto/{id}:
 *   put:
 *     summary: Actualiza una orden de producto por ID
 *     tags: [OrdenesProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden de producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_orden_compra:
 *                 type: string
 *                 description: ID de la orden de compra
 *               id_producto:
 *                 type: string
 *                 description: ID del producto
 *               cantidad:
 *                 type: number
 *                 description: Cantidad del producto ordenado
 *     responses:
 *       200:
 *         description: Orden de producto actualizada exitosamente
 *       404:
 *         description: Orden de producto no encontrada
 *       400:
 *         description: Error al actualizar la orden de producto
 */
router.put('/ordenes-producto/:id', ordenesProductoController.actualizarOrdenDeProducto);

// Eliminar una orden de producto por ID
/**
 * @swagger
 * /api/ordenes-producto/{id}:
 *   delete:
 *     summary: Elimina una orden de producto por ID
 *     tags: [OrdenesProducto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la orden de producto
 *     responses:
 *       200:
 *         description: Orden de producto eliminada correctamente
 *       404:
 *         description: Orden de producto no encontrada
 *       500:
 *         description: Error al eliminar la orden de producto
 */
router.delete('/ordenes-producto/:id', ordenesProductoController.eliminarOrdenDeProducto);

module.exports = router;
