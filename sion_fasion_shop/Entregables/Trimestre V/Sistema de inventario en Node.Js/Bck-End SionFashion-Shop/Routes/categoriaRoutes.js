const express = require('express');
const categoriaController = require('../Controladores/categoriaController');

const router = express.Router();

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *                 description: Nombre de la categoría
 *               sub_categoria:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Categoría creada correctamente
 *       500:
 *         description: Error al crear la categoría
 */
router.post('/categorias', categoriaController.crearCategoria);

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de todas las categorías
 *       500:
 *         description: Error al obtener las categorías
 */
router.get('/categorias', categoriaController.obtenerCategorias);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtiene una categoría por su ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Detalle de la categoría
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al obtener la categoría
 */
router.get('/categorias/:id', categoriaController.obtenerCategoriaPorId);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría por su ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *                 description: Nombre de la categoría
 *               sub_categoria:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al actualizar la categoría
 */
router.put('/categorias/:id', categoriaController.actualizarCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría por su ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al eliminar la categoría
 */
router.delete('/categorias/:id', categoriaController.eliminarCategoria);

module.exports = router;
