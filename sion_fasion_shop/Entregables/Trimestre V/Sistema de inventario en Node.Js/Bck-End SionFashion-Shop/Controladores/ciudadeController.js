const Ciudade = require('../models/ciudade');

// Crear una nueva ciudad
exports.crearCiudad = async (req, res) => {
    try {
        const nuevaCiudad = new Ciudade(req.body);
        await nuevaCiudad.save();
        res.status(201).json(nuevaCiudad);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las ciudades
exports.obtenerCiudades = async (req, res) => {
    try {
        const ciudades = await Ciudade.find()
            .populate('empleados') // Popula empleados asociados
            .populate('id_departamentoNavigation') // Popula departamento asociado
            .populate('proveedores') // Popula proveedores asociados
            .populate('tienda'); // Popula tiendas asociadas
        res.status(200).json(ciudades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una ciudad por su ID
exports.obtenerCiudadPorId = async (req, res) => {
    try {
        const ciudad = await Ciudade.findById(req.params.id)
            .populate('empleados')
            .populate('id_departamentoNavigation')
            .populate('proveedores')
            .populate('tienda');
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
    try {
        const ciudadActualizada = await Ciudade.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!ciudadActualizada) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.status(200).json(ciudadActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una ciudad
exports.eliminarCiudad = async (req, res) => {
    try {
        const ciudadEliminada = await Ciudade.findByIdAndDelete(req.params.id);
        if (!ciudadEliminada) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }
        res.status(200).json({ message: 'Ciudad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
