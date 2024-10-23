const Usuario = require('../models/usuario'); // Asegúrate de que la ruta sea correcta
const usuariosLogic = require('../logic/usuariosLogic'); // Ajusta la ruta según tu estructura
const { usuarioValidationSchema } = require('../validaciones/usuarioValidacion'); // Asegúrate de que la ruta sea correcta
const jwt = require('jsonwebtoken'); // Asegúrate de tener esto instalado

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { email, clave_usuario } = req.body;

    try {
        // Buscar al usuario por el email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Compara la contraseña directamente
        if (usuario.clave_usuario !== clave_usuario) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT (asegúrate de configurar tu clave secreta en un archivo .env)
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        // Validar los datos de entrada
        await usuarioValidationSchema.validateAsync(req.body);

        // Verificar si el email ya existe
        const usuarioExistente = await Usuario.findOne({ email: req.body.email });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const nuevoUsuario = await usuariosLogic.crearUsuario(req.body);
        res.status(201).json({ 
            message: 'Usuario creado exitosamente', 
            usuario: { 
                id: nuevoUsuario._id, 
                nombre_usuario: nuevoUsuario.nombre_usuario,
                email: nuevoUsuario.email, 
                roles: nuevoUsuario.roles,
                registros_actividades: nuevoUsuario.registros_actividades
            } 
        });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosLogic.obtenerUsuarios();
        res.status(200).json(usuarios.map(usuario => ({
            id: usuario._id,
            nombre_usuario: usuario.nombre_usuario,
            email: usuario.email,
            roles: usuario.roles,
            registros_actividades: usuario.registros_actividades
        })));
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuariosLogic.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({
            id: usuario._id,
            nombre_usuario: usuario.nombre_usuario,
            email: usuario.email,
            roles: usuario.roles,
            registros_actividades: usuario.registros_actividades
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
};

// Actualizar un usuario por ID
exports.actualizarUsuario = async (req, res) => {
    try {
        // Validar los datos de entrada
        await usuarioValidationSchema.validateAsync(req.body);
        const usuarioActualizado = await usuariosLogic.actualizarUsuario(req.params.id, req.body);
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            usuario: {
                id: usuarioActualizado._id,
                nombre_usuario: usuarioActualizado.nombre_usuario,
                email: usuarioActualizado.email,
                roles: usuarioActualizado.roles
            }
        });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
};

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await usuariosLogic.eliminarUsuario(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};
