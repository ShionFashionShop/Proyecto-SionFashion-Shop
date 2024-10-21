const Ciudade = require('../models/ciudade');
const ciudadLogic = require('../logic/ciudadeLogic'); 
const ciudadeValidation = require('../validaciones/ciudadValidacion'); // Importa las validaciones con Joi

// Crear una nueva ciudad
exports.crearCiudad = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = ciudadeValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevaCiudad = await ciudadLogic.crearCiudad(req.body);
        res.status(201).json(nuevaCiudad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las ciudades
exports.obtenerCiudades = async (req, res) => {
    try {
        const ciudades = await ciudadLogic.obtenerCiudades();
        res.status(200).json(ciudades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una ciudad por su ID
exports.obtenerCiudadPorId = async (req, res) => {
    try {
        const ciudad = await ciudadLogic.obtenerCiudadPorId(req.params.id);
        if (!ciudad) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.status(200).json(ciudad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una ciudad
exports.actualizarCiudad = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = ciudadeValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const ciudadActualizada = await ciudadLogic.actualizarCiudad(req.params.id, req.body);
        if (!ciudadActualizada) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.status(200).json(ciudadActualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una ciudad
exports.eliminarCiudad = async (req, res) => {
    try {
        const ciudadEliminada = await ciudadLogic.eliminarCiudad(req.params.id);
        if (!ciudadEliminada) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.status(200).json({ message: 'Ciudad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
