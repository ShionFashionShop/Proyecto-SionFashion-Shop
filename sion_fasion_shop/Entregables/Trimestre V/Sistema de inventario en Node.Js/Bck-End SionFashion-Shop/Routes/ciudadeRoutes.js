const express = require('express');
const router = express.Router();
const ciudadeController = require('../Controladores/ciudadeController');

// Ruta para crear una nueva ciudad
router.post('/ciudades', ciudadeController.crearCiudad);

// Ruta para obtener todas las ciudades
router.get('/ciudades', ciudadeController.obtenerCiudades);

// Ruta para obtener una ciudad por ID
router.get('/ciudades/:id', ciudadeController.obtenerCiudadPorId);

// Ruta para actualizar una ciudad
router.put('/ciudades/:id', ciudadeController.actualizarCiudad);

// Ruta para eliminar una ciudad
router.delete('/ciudades/:id', ciudadeController.eliminarCiudad);

module.exports = router;
