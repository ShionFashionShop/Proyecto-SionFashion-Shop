const express = require('express');
const router = express.Router();
const facturaController = require('../Controladores/facturaController');

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: Gestión de facturas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       required:
 *         - fecha_emision_factura
 *         - sub_total_factura
 *         - impuesto_factura
 *         - total_factura
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la factura.
 *         fecha_emision_factura:
 *           type: string
 *           format: date
 *           description: Fecha de emisión de la factura.
 *         sub_total_factura:
 *           type: number
 *           format: decimal
 *           description: Subtotal de la factura.
 *         impuesto_factura:
 *           type: number
 *           format: decimal
 *           description: Impuesto de la factura.
 *         total_factura:
 *           type: number
 *           format: decimal
 *           description: Total de la factura.
 *         id_clienteNavigation:
 *           type: string
 *           description: ID del cliente asociado.
 *         metodos_de_pagos:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de los métodos de pago utilizados.
 *         ordenes_de_compras:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de las órdenes de compra asociadas.
 *         productos:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de los productos facturados.
 *       example:
 *         _id: 61c9a0f8f8d7b2a538e6e29d
 *         fecha_emision_factura: "2023-12-01"
 *         sub_total_factura: 500.00
 *         impuesto_factura: 90.00
 *         total_factura: 590.00
 *         id_clienteNavigation: "61c9a0f8f8d7b2a538e6e29e"
 *         metodos_de_pagos: ["61c9a0f8f8d7b2a538e6e29f"]
 *         ordenes_de_compras: ["61c9a0f8f8d7b2a538e6e2a0"]
 *         productos: ["61c9a0f8f8d7b2a538e6e2a1"]
 */

/**
 * @swagger
 * /api/facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: Factura creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Error en la creación de la factura.
 */
router.post('/facturas', facturaController.crearFactura);

/**
 * @swagger
 * /api/facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de todas las facturas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       500:
 *         description: Error en la obtención de las facturas.
 */
router.get('/facturas', facturaController.obtenerFacturas);

/**
 * @swagger
 * /api/facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Datos de la factura obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *         description: Error al obtener la factura.
 */
router.get('/facturas/:id', facturaController.obtenerFacturaPorId);

/**
 * @swagger
 * /api/facturas/{id}:
 *   put:
 *     summary: Actualizar una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Factura actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Error al actualizar la factura.
 *       404:
 *         description: Factura no encontrada.
 */
router.put('/facturas/:id', facturaController.actualizarFactura);

/**
 * @swagger
 * /api/facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura eliminada correctamente.
 *       404:
 *         description: Factura no encontrada.
 *       500:
 *         description: Error al eliminar la factura.
 */
router.delete('/facturas/:id', facturaController.eliminarFactura);

module.exports = router;
