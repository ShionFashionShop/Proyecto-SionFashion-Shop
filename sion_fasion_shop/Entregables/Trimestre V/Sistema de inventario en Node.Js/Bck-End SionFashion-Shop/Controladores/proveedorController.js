const Proveedor = require('../models/proveedor'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo proveedor
exports.crearProveedor = async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        await nuevoProveedor.save();
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los proveedores
exports.obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find()
            .populate('id_ciudad')
            .populate('productos'); // Poblamos las referencias
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un proveedor por ID
exports.obtenerProveedorPorId = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id)
            .populate('id_ciudad')
            .populate('productos');
        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un proveedor por ID
exports.actualizarProveedor = async (req, res) => {
    try {
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!proveedorActualizado) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json(proveedorActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un proveedor por ID
exports.eliminarProveedor = async (req, res) => {
    try {
        const proveedorEliminado = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedorEliminado) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }
        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
