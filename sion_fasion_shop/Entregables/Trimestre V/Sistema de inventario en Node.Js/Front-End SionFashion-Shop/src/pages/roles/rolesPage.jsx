import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    // Obtener todos los roles al cargar el componente
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

    // Manejar la creación o edición de un rol
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

            // Limpiar formulario después de enviar
            setNombreRol('');
            setDescripcionRol('');
            setUsuarios([]);
        } catch (err) {
            console.error('Error al guardar el rol', err);
            setError('Error al guardar el rol.');
        }
    };

    // Manejar la edición de un rol
    const handleEditarRol = (rol) => {
        setModoEdicion(true);
        setRolActual(rol);
        setNombreRol(rol.nombre_rol);
        setDescripcionRol(rol.descripcion_rol);
        setUsuarios(rol.usuarios || []); // Cargar lista de usuarios
    };

    // Manejar la eliminación de un rol
    const handleEliminarRol = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setRoles(roles.filter(rol => rol._id !== id));
        } catch (err) {
            console.error('Error al eliminar el rol', err);
            setError('Error al eliminar el rol.');
        }
    };

    // Mostrar cargando mientras se obtienen los roles
    if (loading) {
        return <div>Cargando roles...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Gestión de Roles</h1>

            {/* Formulario para crear o editar rol */}
            <form onSubmit={handleCrearRol}>
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
                        onChange={(e) => setUsuarios(e.target.value.split(',').map(id => id.trim()))} // Limpia los espacios en blanco
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Rol' : 'Crear Rol'}</button>
            </form>

            {/* Lista de roles */}
            <h2>Lista de Roles</h2>
            {roles.length > 0 ? (
                <ul>
                    {roles.map(rol => (
                        <li key={rol._id}>
                            <strong>Nombre:</strong> {rol.nombre_rol} | 
                            <strong> Descripción:</strong> {rol.descripcion_rol || 'N/A'} |
                            <strong> Usuarios:</strong> {rol.usuarios?.join(', ') || 'Sin usuarios'}
                            <button onClick={() => handleEditarRol(rol)}>Editar</button>
                            <button onClick={() => handleEliminarRol(rol._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay roles disponibles</p>
            )}
        </div>
    );  
};

export default RolesPage;
