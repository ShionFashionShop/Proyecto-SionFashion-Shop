const Empleado = require('../models/empleado'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo empleado
const crearEmpleado = async (data) => {
    const nuevoEmpleado = new Empleado(data);
    return await nuevoEmpleado.save();
};

// Obtener todos los empleados
const obtenerEmpleados = async () => {
    return await Empleado.find()
        .populate('id_tienda') // Popula la tienda asociada
        .populate('id_ciudad') // Popula la ciudad asociada
        .populate('ordenes_de_compras'); // Popula las órdenes de compra asociadas
};

// Obtener un empleado por ID
const obtenerEmpleadoPorId = async (id) => {
    return await Empleado.findById(id)
        .populate('id_tienda')
        .populate('id_ciudad')
        .populate('ordenes_de_compras');
};

// Actualizar un empleado por ID
const actualizarEmpleado = async (id, data) => {
    return await Empleado.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un empleado por ID
const eliminarEmpleado = async (id) => {
    return await Empleado.findByIdAndDelete(id);
};

module.exports = {
    crearEmpleado,
    obtenerEmpleados,
    obtenerEmpleadoPorId,
    actualizarEmpleado,
    eliminarEmpleado,
};
