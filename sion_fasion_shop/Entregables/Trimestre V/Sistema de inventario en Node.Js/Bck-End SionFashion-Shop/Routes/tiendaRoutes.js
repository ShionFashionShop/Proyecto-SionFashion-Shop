const express = require('express');
const router = express.Router();
const tiendaController = require('../Controladores/tiendaController');

/**
 * @swagger
 * tags:
 *   name: Tiendas
 *   description: API para gestionar las tiendas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tienda:
 *       type: object
 *       required:
 *         - nombre_tienda
 *         - id_ciudad
 *         - id_empresa
 *       properties:
 *         _id:
 *           type: string
 *           description: ID generado automáticamente por MongoDB.
 *         nombre_tienda:
 *           type: string
 *           description: Nombre de la tienda.
 *           example: SION Fashion Shop
 *         telefono_tienda:
 *           type: string
 *           description: Teléfono de la tienda.
 *           example: +573001234567
 *         ubicacion_tienda:
 *           type: string
 *           description: Dirección o ubicación de la tienda.
 *           example: Calle 123, Bogotá, Colombia
 *         id_ciudad:
 *           type: string
 *           description: ID de la ciudad donde se encuentra la tienda.
 *         id_empresa:
 *           type: string
 *           description: ID de la empresa a la que pertenece la tienda.
 *         empleados:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs de los empleados que trabajan en la tienda.
 *         productos:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs de los productos disponibles en la tienda.
 *       example:
 *         nombre_tienda: SION Fashion Shop
 *         telefono_tienda: +573001234567
 *         ubicacion_tienda: Calle 123, Bogotá, Colombia
 *         id_ciudad: 617c1f1d3b148b6e46f1010b
 *         id_empresa: 617c1f1d3b148b6e46f1010a
 *         empleados:
 *           - 617c1f1d3b148b6e46f1010d
 *           - 617c1f1d3b148b6e46f1010e
 *         productos:
 *           - 617c1f1d3b148b6e46f1011c
 *           - 617c1f1d3b148b6e46f1011d
 */

// Crear una nueva tienda
/**
 * @swagger
 * /api/tiendas:
 *   post:
 *     summary: Crear una nueva tienda
 *     tags: [Tiendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tienda'
 *     responses:
 *       201:
 *         description: Tienda creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tienda'
 *       400:
 *         description: Error al crear la tienda
 */
router.post('/tiendas', tiendaController.crearTienda);

// Obtener todas las tiendas
/**
 * @swagger
 * /api/tiendas:
 *   get:
 *     summary: Obtener todas las tiendas
 *     tags: [Tiendas]
 *     responses:
 *       200:
 *         description: Lista de tiendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tienda'
 *       500:
 *         description: Error al obtener las tiendas
 */
router.get('/tiendas', tiendaController.obtenerTiendas);

// Obtener una tienda por ID
/**
 * @swagger
 * /api/tiendas/{id}:
 *   get:
 *     summary: Obtener una tienda por ID
 *     tags: [Tiendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tienda
 *     responses:
 *       200:
 *         description: Tienda encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tienda'
 *       404:
 *         description: Tienda no encontrada
 *       500:
 *         description: Error al obtener la tienda
 */
router.get('/tiendas/:id', tiendaController.obtenerTiendaPorId);

// Actualizar una tienda por ID
/**
 * @swagger
 * /api/tiendas/{id}:
 *   put:
 *     summary: Actualizar una tienda por ID
 *     tags: [Tiendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tienda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tienda'
 *     responses:
 *       200:
 *         description: Tienda actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tienda'
 *       404:
 *         description: Tienda no encontrada
 *       400:
 *         description: Error al actualizar la tienda
 */
router.put('/tiendas/:id', tiendaController.actualizarTienda);

// Eliminar una tienda por ID
/**
 * @swagger
 * /api/tiendas/{id}:
 *   delete:
 *     summary: Eliminar una tienda por ID
 *     tags: [Tiendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tienda
 *     responses:
 *       200:
 *         description: Tienda eliminada exitosamente
 *       404:
 *         description: Tienda no encontrada
 *       500:
 *         description: Error al eliminar la tienda
 */
router.delete('/tiendas/:id', tiendaController.eliminarTienda);

module.exports = router;
