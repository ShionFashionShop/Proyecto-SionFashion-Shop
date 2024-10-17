const express = require('express');
const router = express.Router();
const productoController = require('../Controladores/productoController');

// Rutas para los productos
/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para gestionar los productos
 */

// Crear un nuevo producto
/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *               id_sub_categoria:
 *                 type: string
 *                 description: ID de la subcategoría
 *               id_proveedor:
 *                 type: string
 *                 description: ID del proveedor
 *               id_tienda:
 *                 type: string
 *                 description: ID de la tienda
 *               id_factura:
 *                 type: string
 *                 description: ID de la factura asociada
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error al crear el producto
 */
router.post('/productos', productoController.crearProducto);

// Obtener todos los productos
/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de todos los productos
 *       500:
 *         description: Error al obtener los productos
 */
router.get('/productos', productoController.obtenerProductos);

// Obtener un producto por ID
/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al obtener el producto
 */
router.get('/productos/:id', productoController.obtenerProductoPorId);

// Actualizar un producto por ID
/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *               id_sub_categoria:
 *                 type: string
 *                 description: ID de la subcategoría
 *               id_proveedor:
 *                 type: string
 *                 description: ID del proveedor
 *               id_tienda:
 *                 type: string
 *                 description: ID de la tienda
 *               id_factura:
 *                 type: string
 *                 description: ID de la factura asociada
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al actualizar el producto
 */
router.put('/productos/:id', productoController.actualizarProducto);

// Eliminar un producto por ID
/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar el producto
 */
router.delete('/productos/:id', productoController.eliminarProducto);

module.exports = router;
