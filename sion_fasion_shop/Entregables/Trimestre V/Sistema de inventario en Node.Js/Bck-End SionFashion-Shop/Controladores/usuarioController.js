const Usuario = require('../models/usuario'); // Asegúrate de que la ruta sea correcta
const usuariosLogic = require('../logic/usuariosLogic'); // Ajusta la ruta según tu estructura
const { usuarioValidationSchema } = require('../validaciones/usuarioValidacion'); // Asegúrate de que la ruta sea correcta
const jwt = require('jsonwebtoken'); // Asegúrate de tener esto instalado
const { validationResult } = require('express-validator');
const Role = require('../models/role'); // Asegúrate de importar el modelo Role

// Función para registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    // Validar los errores provenientes de express-validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { nombre_usuario, email, clave_usuario } = req.body;

    try {
        // Verificar si el usuario ya existe
        let usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El correo electrónico ya está en uso' });
        }

        // Crear un nuevo usuario sin roles y sin encriptar la contraseña
        const nuevoUsuario = new Usuario({
            nombre_usuario,
            email,
            clave_usuario,  // Se guarda tal cual como se recibe
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        // Responder con un mensaje de éxito
        res.status(201).json({ msg: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};





exports.iniciarSesion = async (req, res) => {
    const { email, clave_usuario } = req.body;

    try {
        // Buscar al usuario por el email y hacer populate de los roles para obtener los nombres
        const usuario = await Usuario.findOne({ email }).populate('roles');
        
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Compara la contraseña directamente sin encriptación
        if (usuario.clave_usuario !== clave_usuario) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Extraer los nombres de los roles
        const roles = usuario.roles.map(role => role.nombre_rol);

        // Generar un token JWT que incluye el rol del usuario
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, roles }, // Incluye el nombre del rol
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Envía el token y los nombres de los roles como parte de la respuesta
        res.status(200).json({ success: true, token, roles });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
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
