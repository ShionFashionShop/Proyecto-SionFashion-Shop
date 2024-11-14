import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const API_URL = 'https://localhost:3000/api/roles';

const RolesPage = () => {
    const [roles, setRoles] = useState([]);
    const [nombreRol, setNombreRol] = useState('');
    const [descripcionRol, setDescripcionRol] = useState('');
    const [usuarios, setUsuarios] = useState([]); // Almacena IDs de usuarios
    const [modoEdicion, setModoEdicion] = useState(false);
    const [rolActual, setRolActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(API_URL);
                setRoles(response.data);
            } catch (err) {
                console.error('Error al obtener los roles', err);
                setError('Error al obtener los roles. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleCrearRol = async (e) => {
        e.preventDefault();

        const nuevoRol = {
            nombre_rol: nombreRol,
            descripcion_rol: descripcionRol,
            usuarios: usuarios,
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${rolActual._id}`, nuevoRol);
                setRoles(roles.map(rol =>
                    rol._id === rolActual._id ? { ...rolActual, ...nuevoRol } : rol
                ));
                setModoEdicion(false);
                setRolActual(null);
            } else {
                const response = await axios.post(API_URL, nuevoRol);
                setRoles([...roles, response.data]);
            }

            setNombreRol('');
            setDescripcionRol('');
            setUsuarios([]);
        } catch (err) {
            console.error('Error al guardar el rol', err);
            setError('Error al guardar el rol.');
        }
    };

    const handleEditarRol = (rol) => {
        setModoEdicion(true);
        setRolActual(rol);
        setNombreRol(rol.nombre_rol);
        setDescripcionRol(rol.descripcion_rol);
        setUsuarios(rol.usuarios || []);
    };

    const handleEliminarRol = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setRoles(roles.filter(rol => rol._id !== id));
        } catch (err) {
            console.error('Error al eliminar el rol', err);
            setError('Error al eliminar el rol.');
        }
    };

    if (loading) {
        return <div>Cargando roles...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    //const columns = [
    //    {
    //        name: 'Nombre del Rol',
    //        selector: row => row.nombre_rol,
    //        sortable: true,
    //        width: '20%',
    //    },
    //    {
    //        name: 'Descripción',
    //        selector: row => row.descripcion_rol || 'N/A',
    //        sortable: true,
    //        width: '40%',
    //    },
    //    {
    //        name: 'Usuarios',
    //        selector: row => row.usuarios?.join(', ') || 'Sin usuarios',
    //        sortable: true,
    //        width: '30%',
    //    },
    //    {
    //        name: 'Acciones',
    //        cell: row => (
    //            <div style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
    //                <button onClick={() => handleEditarRol(row)}>Editar</button>
    //                <button onClick={() => handleEliminarRol(row._id)}>Eliminar</button>
    //            </div>
    //        ),
    //        ignoreRowClick: true,
    //        allowOverflow: true,
    //        button: true,
    //        width: '10%',
    //    },
    //];

    return (
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1 className="title">Gestión de Usuarios</h1>
            </div>
            <div className=" w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleCrearRol} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{modoEdicion ? 'Actualizar Rol' : 'Crear Rol'}</button>
                    <label className="w-100">Nombre del Rol:</label>
                    <input className="w-100" type="text" value={nombreRol} onChange={(e) => setNombreRol(e.target.value)} required />
                    <label className="w-100">Descripción del Rol:</label>
                    <input className="w-100" type="text" value={descripcionRol} onChange={(e) => setDescripcionRol(e.target.value)} />
                    <label className="w-100">Usuarios (IDs separados por coma):</label>
                    <input className="w-100" type="text" value={usuarios.join(',')} onChange={(e) => setUsuarios(e.target.value.split(',').map(id => id.trim()))} />
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Roles</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre de Rol</th>
                                <th>Descripcion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((roles) => (
                                <tr key={roles._id}>
                                    <td>{roles.nombre_rol}</td>
                                    <td>{roles.descripcion_rol}</td>
                                 
                                    <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEditarRol(roles)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEliminarRol(roles._id)}>Eliminar</button>
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

export default RolesPage;