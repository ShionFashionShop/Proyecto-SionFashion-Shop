const express = require('express');
const router = express.Router();
const metodosDePagoController = require('../Controladores/metododepagoController');

/**
 * @swagger
 * tags:
 *   name: MétodosDePago
 *   description: API para gestionar métodos de pago
 */

/**
 * @swagger
 * /api/metodosDePago:
 *   post:
 *     summary: Crear un nuevo método de pago
 *     tags: [MétodosDePago]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_factura:
 *                 type: string
 *                 description: ID de la factura asociada.
 *               metodo:
 *                 type: string
 *                 description: Nombre del método de pago.
 *               monto:
 *                 type: number
 *                 description: Monto del pago.
 *             required:
 *               - id_factura
 *               - metodo
 *               - monto
 *     responses:
 *       201:
 *         description: Método de pago creado correctamente.
 *       400:
 *         description: Error en la solicitud.
 */

/**
 * @swagger
 * /api/metodosDePago:
 *   get:
 *     summary: Obtener todos los métodos de pago
 *     tags: [MétodosDePago]
 *     responses:
 *       200:
 *         description: Lista de métodos de pago.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/metodosDePago/{id}:
 *   get:
 *     summary: Obtener un método de pago por ID
 *     tags: [MétodosDePago]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del método de pago
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Método de pago encontrado.
 *       404:
 *         description: Método de pago no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /api/metodosDePago/{id}:
 *   put:
 *     summary: Actualizar un método de pago por ID
 *     tags: [MétodosDePago]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del método de pago
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_factura:
 *                 type: string
 *                 description: ID de la factura asociada.
 *               metodo:
 *                 type: string
 *                 description: Nombre del método de pago.
 *               monto:
 *                 type: number
 *                 description: Monto del pago.
 *     responses:
 *       200:
 *         description: Método de pago actualizado correctamente.
 *       404:
 *         description: Método de pago no encontrado.
 *       400:
 *         description: Error en la solicitud.
 */

/**
 * @swagger
 * /api/metodosDePago/{id}:
 *   delete:
 *     summary: Eliminar un método de pago por ID
 *     tags: [MétodosDePago]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del método de pago
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Método de pago eliminado correctamente.
 *       404:
 *         description: Método de pago no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */



// Crear un nuevo método de pago
router.post('/metodosDePago', metodosDePagoController.crearMetodoDePago);

// Obtener todos los métodos de pago
router.get('/metodosDePago', metodosDePagoController.obtenerMetodosDePago);

// Obtener un método de pago por ID
router.get('/metodosDePago/:id', metodosDePagoController.obtenerMetodoDePagoPorId);

// Actualizar un método de pago por ID
router.put('/metodosDePago/:id', metodosDePagoController.actualizarMetodoDePago);

// Eliminar un método de pago por ID
router.delete('/metodosDePago/:id', metodosDePagoController.eliminarMetodoDePago);

module.exports = router;
