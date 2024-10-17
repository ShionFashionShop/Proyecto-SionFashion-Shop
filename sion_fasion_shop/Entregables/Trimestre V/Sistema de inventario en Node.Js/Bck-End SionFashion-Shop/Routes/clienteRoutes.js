const express = require('express');
const router = express.Router();
const clienteController = require('../Controladores/clienteController');


/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado del cliente
 *         nombre:
 *           type: string
 *           description: Nombre del cliente
 *         email:
 *           type: string
 *           description: Correo electrónico del cliente
 *         telefono:
 *           type: string
 *           description: Número de teléfono del cliente
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         nombre: Juan Pérez
 *         email: juan.perez@example.com
 *         telefono: 3001234567
 *         direccion: Calle 123 #45-67, Ciudad
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Error en la solicitud
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de todos los clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Datos del cliente solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Cliente no encontrado
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */


// Ruta para crear un nuevo cliente
router.post('/', clienteController.crearCliente);

// Ruta para obtener todos los clientes
router.get('/', clienteController.obtenerClientes);

// Ruta para obtener un cliente por ID
router.get('/:id', clienteController.obtenerClientePorId);

// Ruta para actualizar un cliente por ID
router.put('/:id', clienteController.actualizarCliente);

// Ruta para eliminar un cliente por ID
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
