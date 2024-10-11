const express = require('express');
const router = express.Router();
const alertasStockController = require('../controllers/alertasStockController');

// Rutas para alertas de stock
router.post('/alertas', alertasStockController.crearAlertaStock);
router.get('/alertas', alertasStockController.obtenerAlertasStock);
router.get('/alertas/:id', alertasStockController.obtenerAlertaStockPorId);
router.put('/alertas/:id', alertasStockController.actualizarAlertaStock);
router.delete('/alertas/:id', alertasStockController.eliminarAlertaStock);

module.exports = router;
