const express = require('express');
const router = express.Router();
const alquilerController = require('../controller/alquilercontroller');

// Registrar un nuevo alquiler
router.post('/', alquilerController.realizarAlquiler);

// Historial completo de alquileres
router.get('/historial', alquilerController.historial);

// Alquileres de un cliente específico
router.get('/cliente/:clienteId', alquilerController.alquileresPorCliente);

// Devolver un vehículo
router.put('/devolver/:alquilerId', alquilerController.devolverVehiculo);

module.exports = router;