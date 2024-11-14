import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmpleadoPage = () => {
    const [empleados, setEmpleados] = useState([]);
    const [formData, setFormData] = useState({
        dni_empleado: '',
        nombres_empleado: '',
        apellidos_empleado: '',
        telefono_empleado: '',
        email_empleado: '',
        id_tienda: '',
        id_ciudad: '',
        ordenes_de_compras: []
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const API_URL = 'https://localhost:3000/api/empleados';

    // Obtener todos los empleados
    const fetchEmpleados = async () => {
        try {
            const response = await axios.get(API_URL);
            setEmpleados(response.data);
        } catch (error) {
            console.error('Error al obtener empleados:', error);
        }
    };

    useEffect(() => {
        fetchEmpleados();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Crear un nuevo empleado
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                // Actualizar empleado
                await axios.put(`${API_URL}/${currentId}`, formData);
            } else {
                // Crear nuevo empleado
                await axios.post(API_URL, formData);
            }
            setFormData({
                dni_empleado: '',
                nombres_empleado: '',
                apellidos_empleado: '',
                telefono_empleado: '',
                email_empleado: '',
                id_tienda: '',
                id_ciudad: '',
                ordenes_de_compras: []
            });
            setEditing(false);
            setCurrentId(null);
            fetchEmpleados();
        } catch (error) {
            console.error('Error al guardar empleado:', error);
        }
    };

    // Editar un empleado
    const handleEdit = (empleado) => {
        setEditing(true);
        setCurrentId(empleado._id);
        setFormData({
            dni_empleado: empleado.dni_empleado,
            nombres_empleado: empleado.nombres_empleado,
            apellidos_empleado: empleado.apellidos_empleado,
            telefono_empleado: empleado.telefono_empleado,
            email_empleado: empleado.email_empleado,
            id_tienda: empleado.id_tienda,
            id_ciudad: empleado.id_ciudad,
            ordenes_de_compras: empleado.ordenes_de_compras
        });
    };

    // Eliminar un empleado
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchEmpleados();
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
        }
    };

    return (
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1>Gestión de Empleados</h1>
            </div>
            <div className="w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleSubmit} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
                    <label className="w-100">DNI</label>
                    <input className="w-100" type="text" name="dni_empleado" placeholder="DNI" value={formData.dni_empleado} onChange={handleChange} required />
                    <label className="w-100">Nombres</label>
                    <input className="w-100" type="text" name="nombres_empleado" placeholder="Nombres" value={formData.nombres_empleado} onChange={handleChange} required />
                    <label className="w-100">Apellidos</label>
                    <input className="w-100" type="text" name="apellidos_empleado" placeholder="Apellidos" value={formData.apellidos_empleado} onChange={handleChange} required />
                    <label className="w-100">Teléfono</label>
                    <input className="w-100" type="text" name="telefono_empleado" placeholder="Teléfono" value={formData.telefono_empleado} onChange={handleChange} />
                    <label className="w-100">Email</label>
                    <input className="w-100" type="email" name="email_empleado" placeholder="Email" value={formData.email_empleado} onChange={handleChange} />
                    <label className="w-100">Tienda</label>
                    <input className="w-100" type="text" name="id_tienda" placeholder="ID Tienda" value={formData.id_tienda} onChange={handleChange} />
                    <label className="w-100">Ciudad</label>
                    <input className="w-100" type="text" name="id_ciudad" placeholder="ID Ciudad" value={formData.id_ciudad} onChange={handleChange} />
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Empleados</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th >Id Empleado</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Telefono</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((empleado) => (
                                <tr key={empleado._id}>
                                    <td> {empleado.dni_empleado}  </td>
                                    <td> {empleado.nombres_empleado}  </td>
                                    <td> {empleado.apellidos_empleado}  </td>
                                    <td> {empleado.telefono_empleado}  </td>
                                    <td> {empleado.email_empleado}  </td>
                                    <td> <button className="btn btn-outline-info m-1" onClick={() => handleEdit(empleado)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleDelete(empleado._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );

};
export default EmpleadoPage;
