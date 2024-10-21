const Cliente = require('../models/cliente');
const clienteLogic = require('../logic/clienteLogic'); 
const clienteValidation = require('../validaciones/clienteValidacion'); // Importa las validaciones con Joi

// Crear un nuevo cliente
exports.crearCliente = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = clienteValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const nuevoCliente = await clienteLogic.crearCliente(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
    try {
        const clientes = await clienteLogic.obtenerClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un cliente por ID
exports.obtenerClientePorId = async (req, res) => {
    try {
        const cliente = await clienteLogic.obtenerClientePorId(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un cliente por ID
exports.actualizarCliente = async (req, res) => {
    // Validar los datos de la solicitud
    const { error } = clienteValidation.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const clienteActualizado = await clienteLogic.actualizarCliente(req.params.id, req.body);
        if (!clienteActualizado) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un cliente por ID
exports.eliminarCliente = async (req, res) => {
    try {
        const clienteEliminado = await clienteLogic.eliminarCliente(req.params.id);
        if (!clienteEliminado) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
