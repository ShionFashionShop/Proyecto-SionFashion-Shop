const Empleado = require('../models/empleado');

// Crear un nuevo empleado
exports.crearEmpleado = async (req, res) => {
    try {
        const nuevoEmpleado = new Empleado(req.body);
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los empleados
exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find()
            .populate('id_tienda') // Popula la tienda asociada
            .populate('id_ciudad') // Popula la ciudad asociada
            .populate('ordenes_de_compras'); // Popula las órdenes de compra asociadas
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un empleado por ID
exports.obtenerEmpleadoPorId = async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id)
            .populate('id_tienda')
            .populate('id_ciudad')
            .populate('ordenes_de_compras');
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
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!empleadoActualizado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json(empleadoActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un empleado por ID
exports.eliminarEmpleado = async (req, res) => {
    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleadoEliminado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }
        res.status(200).json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
