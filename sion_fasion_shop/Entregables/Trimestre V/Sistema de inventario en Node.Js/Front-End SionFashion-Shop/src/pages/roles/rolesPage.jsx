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

    const columns = [
        {
            name: 'Nombre del Rol',
            selector: row => row.nombre_rol,
            sortable: true,
            width: '20%',
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion_rol || 'N/A',
            sortable: true,
            width: '40%',
        },
        {
            name: 'Usuarios',
            selector: row => row.usuarios?.join(', ') || 'Sin usuarios',
            sortable: true,
            width: '30%',
        },
        {
            name: 'Acciones',
            cell: row => (
                <div style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
                    <button onClick={() => handleEditarRol(row)}>Editar</button>
                    <button onClick={() => handleEliminarRol(row._id)}>Eliminar</button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '10%',
        },
    ];

    return (
        <div>
            <h1>Gestión de Roles</h1>

            <form onSubmit={handleCrearRol} style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <div>
                    <label>Nombre del Rol:</label>
                    <input
                        type="text"
                        value={nombreRol}
                        onChange={(e) => setNombreRol(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción del Rol:</label>
                    <input
                        type="text"
                        value={descripcionRol}
                        onChange={(e) => setDescripcionRol(e.target.value)}
                    />
                </div>
                <div>
                    <label>Usuarios (IDs separados por coma):</label>
                    <input
                        type="text"
                        value={usuarios.join(',')}
                        onChange={(e) => setUsuarios(e.target.value.split(',').map(id => id.trim()))}
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Rol' : 'Crear Rol'}</button>
            </form>

            <h2>Lista de Roles</h2>
            <DataTable
                columns={columns}
                data={roles}
                pagination
                highlightOnHover
                paginationPerPage={3} // Muestra solo 3 registros por página de inicio
                responsive
                striped
                customStyles={{
                    table: {
                        style: {
                            width: '100%',
                        },
                    },
                }}
            />
        </div>
    );
};

export default RolesPage;
