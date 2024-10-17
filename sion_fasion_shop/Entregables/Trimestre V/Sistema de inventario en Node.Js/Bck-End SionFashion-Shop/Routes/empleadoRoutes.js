const express = require('express');
const router = express.Router();
const empleadoController = require('../Controladores/empleadoController');

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: API para la gestión de empleados
 */

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *               apellido:
 *                 type: string
 *                 description: Apellido del empleado
 *               id_tienda:
 *                 type: string
 *                 description: ID de la tienda asociada
 *               id_ciudad:
 *                 type: string
 *                 description: ID de la ciudad asociada
 *               ordenes_de_compras:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs de las órdenes de compra asociadas
 *             example:
 *               nombre: "Carlos"
 *               apellido: "Ramírez"
 *               id_tienda: "5f8d04f94b5d5b0017a9a879"
 *               id_ciudad: "5f8d04f94b5d5b0017a9a880"
 *               ordenes_de_compras: ["5f8d04f94b5d5b0017a9a881", "5f8d04f94b5d5b0017a9a882"]
 *     responses:
 *       201:
 *         description: Empleado creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Error en la creación del empleado
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de todos los empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     summary: Actualizar un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               id_tienda:
 *                 type: string
 *               id_ciudad:
 *                 type: string
 *               ordenes_de_compras:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Empleado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Error en la actualización del empleado
 *       404:
 *         description: Empleado no encontrado
 */

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     summary: Eliminar un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado correctamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleado:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - id_tienda
 *         - id_ciudad
 *       properties:
 *         id:
 *           type: string
 *           description: ID del empleado
 *         nombre:
 *           type: string
 *           description: Nombre del empleado
 *         apellido:
 *           type: string
 *           description: Apellido del empleado
 *         id_tienda:
 *           type: string
 *           description: ID de la tienda asociada
 *         id_ciudad:
 *           type: string
 *           description: ID de la ciudad asociada
 *         ordenes_de_compras:
 *           type: array
 *           items:
 *             type: string
 *           description: IDs de las órdenes de compra asociadas
 *       example:
 *         id: "60b8d1f8d1f8f8f8f8f8f8f8"
 *         nombre: "Carlos"
 *         apellido: "Ramírez"
 *         id_tienda: "5f8d04f94b5d5b0017a9a879"
 *         id_ciudad: "5f8d04f94b5d5b0017a9a880"
 *         ordenes_de_compras: ["5f8d04f94b5d5b0017a9a881", "5f8d04f94b5d5b0017a9a882"]
 */

// Ruta para crear un nuevo empleado
router.post('/', empleadoController.crearEmpleado);

// Ruta para obtener todos los empleados
router.get('/', empleadoController.obtenerEmpleados);

// Ruta para obtener un empleado por ID
router.get('/:id', empleadoController.obtenerEmpleadoPorId);

// Ruta para actualizar un empleado por ID
router.put('/:id', empleadoController.actualizarEmpleado);

// Ruta para eliminar un empleado por ID
router.delete('/:id', empleadoController.eliminarEmpleado);

module.exports = router;
