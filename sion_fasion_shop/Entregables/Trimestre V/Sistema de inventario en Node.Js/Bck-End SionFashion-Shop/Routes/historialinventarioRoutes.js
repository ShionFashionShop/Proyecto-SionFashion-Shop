const express = require('express');
const router = express.Router();
const historialInventarioController = require('../Controladores/historialinventarioController');

/**
 * @swagger
 * tags:
 *   name: HistorialInventario
 *   description: Gestión del historial de inventario
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HistorialInventario:
 *       type: object
 *       required:
 *         - fecha
 *         - cantidad
 *         - id_producto
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del historial de inventario.
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del registro de inventario.
 *         cantidad:
 *           type: number
 *           format: integer
 *           description: Cantidad del producto en el historial.
 *         id_producto:
 *           type: string
 *           description: ID del producto asociado.
 *       example:
 *         _id: 61c9a0f8f8d7b2a538e6e29d
 *         fecha: "2023-12-01"
 *         cantidad: 100
 *         id_producto: "61c9a0f8f8d7b2a538e6e29e"
 */

/**
 * @swagger
 * /api/historial-inventario:
 *   post:
 *     summary: Crear un nuevo historial de inventario
 *     tags: [HistorialInventario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialInventario'
 *     responses:
 *       201:
 *         description: Historial de inventario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialInventario'
 *       400:
 *         description: Error en la creación del historial de inventario.
 */
router.post('/historial-inventario', historialInventarioController.crearHistorialInventario);

/**
 * @swagger
 * /api/historial-inventario:
 *   get:
 *     summary: Obtener todos los registros de historial de inventario
 *     tags: [HistorialInventario]
 *     responses:
 *       200:
 *         description: Lista de todos los historiales de inventario.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistorialInventario'
 *       500:
 *         description: Error en la obtención de los historiales de inventario.
 */
router.get('/historial-inventario', historialInventarioController.obtenerHistorialInventario);

/**
 * @swagger
 * /api/historial-inventario/{id}:
 *   get:
 *     summary: Obtener un historial de inventario por ID
 *     tags: [HistorialInventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historial de inventario
 *     responses:
 *       200:
 *         description: Datos del historial de inventario obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialInventario'
 *       404:
 *         description: Historial de inventario no encontrado.
 *       500:
 *         description: Error al obtener el historial de inventario.
 */
router.get('/historial-inventario/:id', historialInventarioController.obtenerHistorialInventarioPorId);

/**
 * @swagger
 * /api/historial-inventario/{id}:
 *   put:
 *     summary: Actualizar un historial de inventario por ID
 *     tags: [HistorialInventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historial de inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialInventario'
 *     responses:
 *       200:
 *         description: Historial de inventario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialInventario'
 *       400:
 *         description: Error al actualizar el historial de inventario.
 *       404:
 *         description: Historial de inventario no encontrado.
 */
router.put('/historial-inventario/:id', historialInventarioController.actualizarHistorialInventario);

/**
 * @swagger
 * /api/historial-inventario/{id}:
 *   delete:
 *     summary: Eliminar un historial de inventario por ID
 *     tags: [HistorialInventario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del historial de inventario
 *     responses:
 *       200:
 *         description: Historial de inventario eliminado correctamente.
 *       404:
 *         description: Historial de inventario no encontrado.
 *       500:
 *         description: Error al eliminar el historial de inventario.
 */
router.delete('/historial-inventario/:id', historialInventarioController.eliminarHistorialInventario);

module.exports = router;
