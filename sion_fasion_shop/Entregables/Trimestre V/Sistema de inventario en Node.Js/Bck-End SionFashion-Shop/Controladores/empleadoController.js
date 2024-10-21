const Empleado = require('../models/empleado');
const empleadoLogic = require('../logic/empleadoLogic');
const empleadoValidation = require('../validaciones/empleadoValidacion'); // Importa las validaciones con Joi

// Crear un nuevo empleado
exports.crearEmpleado = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = empleadoValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevoEmpleado = await empleadoLogic.crearEmpleado(req.body);
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los empleados
exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await empleadoLogic.obtenerEmpleados();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un empleado por ID
exports.obtenerEmpleadoPorId = async (req, res) => {
    try {
        const empleado = await empleadoLogic.obtenerEmpleadoPorId(req.params.id);
        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json(empleado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un empleado por ID
exports.actualizarEmpleado = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = empleadoValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const empleadoActualizado = await empleadoLogic.actualizarEmpleado(req.params.id, req.body);
        if (!empleadoActualizado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json(empleadoActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un empleado por ID
exports.eliminarEmpleado = async (req, res) => {
    try {
        const empleadoEliminado = await empleadoLogic.eliminarEmpleado(req.params.id);
        if (!empleadoEliminado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
