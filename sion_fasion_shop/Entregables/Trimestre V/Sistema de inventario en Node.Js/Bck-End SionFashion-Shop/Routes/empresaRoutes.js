const express = require('express');
const router = express.Router();
const empresaController = require('../Controladores/empresaController');

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Gestión de empresas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       required:
 *         - nombre_empresa
 *         - direccion_empresa
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la empresa.
 *         nombre_empresa:
 *           type: string
 *           description: Nombre de la empresa.
 *         direccion_empresa:
 *           type: string
 *           description: Dirección de la empresa.
 *         telefono_empresa:
 *           type: string
 *           description: Teléfono de la empresa.
 *         tienda:
 *           type: array
 *           items:
 *             type: string
 *             description: Lista de IDs de tiendas asociadas.
 *       example:
 *         _id: 60d2ca3f9f1b2341b8fd5a34
 *         nombre_empresa: "Empresa XYZ"
 *         direccion_empresa: "Calle 123, Ciudad ABC"
 *         telefono_empresa: "5551234567"
 *         tienda: ["60d2ca3f9f1b2341b8fd5a35"]
 */

/**
 * @swagger
 * /api/empresas:
 *   post:
 *     summary: Crear una nueva empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       400:
 *         description: Error en la creación de la empresa.
 */
router.post('/empresas', empresaController.crearEmpresa);

/**
 * @swagger
 * /api/empresas:
 *   get:
 *     summary: Obtener todas las empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de todas las empresas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 *       500:
 *         description: Error al obtener las empresas.
 */
router.get('/empresas', empresaController.obtenerEmpresas);

/**
 * @swagger
 * /api/empresas/{id}:
 *   get:
 *     summary: Obtener una empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Detalles de la empresa obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: Empresa no encontrada.
 *       500:
 *         description: Error al obtener la empresa.
 */
router.get('/empresas/:id', empresaController.obtenerEmpresaPorId);

/**
 * @swagger
 * /api/empresas/{id}:
 *   put:
 *     summary: Actualizar una empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: Empresa actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       400:
 *         description: Error en la actualización de la empresa.
 *       404:
 *         description: Empresa no encontrada.
 */
router.put('/empresas/:id', empresaController.actualizarEmpresa);

/**
 * @swagger
 * /api/empresas/{id}:
 *   delete:
 *     summary: Eliminar una empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa eliminada correctamente.
 *       404:
 *         description: Empresa no encontrada.
 *       500:
 *         description: Error al eliminar la empresa.
 */
router.delete('/empresas/:id', empresaController.eliminarEmpresa);

module.exports = router;
