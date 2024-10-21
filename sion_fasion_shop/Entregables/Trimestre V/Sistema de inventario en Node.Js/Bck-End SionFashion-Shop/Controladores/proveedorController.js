const Proveedor = require('../models/proveedor'); // Asegúrate de que la ruta sea correcta
const proveedoresLogic = require('../logic/proveedoresLogic'); // Ajusta la ruta según tu estructura
const { proveedorValidationSchema } = require('../validaciones/proveedorValidacion'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo proveedor
exports.crearProveedor = async (req, res) => {
    try {
        // Validar los datos de entrada
        await proveedorValidationSchema.validateAsync(req.body);
        const nuevoProveedor = await proveedoresLogic.crearProveedor(req.body);
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el proveedor', error: error.message });
    }
};

// Obtener todos los proveedores
exports.obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await proveedoresLogic.obtenerProveedores();
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los proveedores', error: error.message });
    }
};

// Obtener un proveedor por ID
exports.obtenerProveedorPorId = async (req, res) => {
    try {
        const proveedor = await proveedoresLogic.obtenerProveedorPorId(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el proveedor', error: error.message });
    }
};

// Actualizar un proveedor por ID
exports.actualizarProveedor = async (req, res) => {
    try {
        // Validar los datos de entrada
        await proveedorValidationSchema.validateAsync(req.body);
        const proveedorActualizado = await proveedoresLogic.actualizarProveedor(req.params.id, req.body);
        if (!proveedorActualizado) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(proveedorActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el proveedor', error: error.message });
    }
};

// Eliminar un proveedor por ID
exports.eliminarProveedor = async (req, res) => {
    try {
        const proveedorEliminado = await proveedoresLogic.eliminarProveedor(req.params.id);
        if (!proveedorEliminado) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proveedor', error: error.message });
    }
};
