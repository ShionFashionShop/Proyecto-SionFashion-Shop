const express = require('express');
const router = express.Router();
const subCategoriaController = require('../Controladores/subcategoriaController');

// Rutas para las SubCategorías
/**
 * @swagger
 * tags:
 *   name: SubCategoria
 *   description: API para gestionar las subcategorías
 */

// Esquema del modelo SubCategoria
/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategoria:
 *       type: object
 *       properties:
 *         nombre_sub_categoria:
 *           type: string
 *           description: Nombre de la subcategoría
 *           example: "Ropa de Mujer"
 *         id_categoria:
 *           type: string
 *           description: ID de la categoría asociada
 *           example: "60d5ec49d4b3f12f881d478e"
 *         productos:
 *           type: array
 *           items:
 *             type: string
 *             description: ID de los productos asociados
 *             example: ["60d5ec49d4b3f12f881d478f", "60d5ec49d4b3f12f881d4790"]
 */

// Crear una nueva subcategoría
/**
 * @swagger
 * /api/subcategorias:
 *   post:
 *     summary: Crear una nueva subcategoría
 *     tags: [SubCategoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategoria'
 *     responses:
 *       201:
 *         description: Subcategoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategoria'
 *       400:
 *         description: Error al crear la subcategoría
 */
router.post('/subcategorias', subCategoriaController.crearSubCategoria);

// Obtener todas las subcategorías
/**
 * @swagger
 * /api/subcategorias:
 *   get:
 *     summary: Obtener todas las subcategorías
 *     tags: [SubCategoria]
 *     responses:
 *       200:
 *         description: Lista de subcategorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategoria'
 *       500:
 *         description: Error al obtener las subcategorías
 */
router.get('/subcategorias', subCategoriaController.obtenerSubCategorias);

// Obtener una subcategoría por ID
/**
 * @swagger
 * /api/subcategorias/{id}:
 *   get:
 *     summary: Obtener una subcategoría por ID
 *     tags: [SubCategoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la subcategoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategoria'
 *       404:
 *         description: Subcategoría no encontrada
 *       500:
 *         description: Error al obtener la subcategoría
 */
router.get('/subcategorias/:id', subCategoriaController.obtenerSubCategoriaPorId);

// Actualizar una subcategoría por ID
/**
 * @swagger
 * /api/subcategorias/{id}:
 *   put:
 *     summary: Actualizar una subcategoría por ID
 *     tags: [SubCategoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la subcategoría
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategoria'
 *     responses:
 *       200:
 *         description: Subcategoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategoria'
 *       404:
 *         description: Subcategoría no encontrada
 *       400:
 *         description: Error al actualizar la subcategoría
 */
router.put('/subcategorias/:id', subCategoriaController.actualizarSubCategoria);

// Eliminar una subcategoría por ID
/**
 * @swagger
 * /api/subcategorias/{id}:
 *   delete:
 *     summary: Eliminar una subcategoría por ID
 *     tags: [SubCategoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la subcategoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subcategoría eliminada exitosamente
 *       404:
 *         description: Subcategoría no encontrada
 *       500:
 *         description: Error al eliminar la subcategoría
 */
router.delete('/subcategorias/:id', subCategoriaController.eliminarSubCategoria);

module.exports = router;
