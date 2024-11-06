import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL_USUARIOS = 'https://localhost:3000/api/usuarios';
const API_URL_ROLES = 'https://localhost:3000/api/roles';
const API_URL_REGISTROS = 'https://localhost:3000/api/registro-actividad';

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [registrosActividades, setRegistrosActividades] = useState([]);
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        email: '',
        clave_usuario: '',
        roles: '',
        registros_actividades: ''
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usuariosData, rolesData, registrosData] = await Promise.all([
                    axios.get(API_URL_USUARIOS),
                    axios.get(API_URL_ROLES),
                    axios.get(API_URL_REGISTROS)
                ]);
                setUsuarios(usuariosData.data);
                setRoles(rolesData.data);
                setRegistrosActividades(registrosData.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setError('Error al obtener los datos de la API.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e, field) => {
        const selectedValue = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: selectedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que la contraseña no esté vacía si es un nuevo usuario o si se está editando
        if (!formData.clave_usuario && !editingUserId) {
            setError('La contraseña es obligatoria para crear un nuevo usuario.');
            return;
        }

        try {
            const payload = {
                ...formData,
                roles: [formData.roles],
                registros_actividades: formData.registros_actividades ? [formData.registros_actividades] : [] // Asegúrate de que sea un array
            };
            if (editingUserId) {
                // Actualizar usuario existente
                await axios.put(`${API_URL_USUARIOS}/${editingUserId}`, payload);
                setUsuarios((prev) =>
                    prev.map((usuario) => (usuario._id === editingUserId ? { ...usuario, ...payload } : usuario))
                );
                setEditingUserId(null); // Resetear el ID de edición
            } else {
                // Crear un nuevo usuario
                const response = await axios.post(API_URL_USUARIOS, payload);
                setUsuarios((prev) => [...prev, response.data]); // Agregar el nuevo usuario a la lista
            }
            // Reiniciar el formulario
            setFormData({ nombre_usuario: '', email: '', clave_usuario: '', roles: '', registros_actividades: '' });
            setError(null); // Limpiar errores al enviar el formulario
        } catch (error) {
            console.error(`Error al ${editingUserId ? 'actualizar' : 'crear'} usuario:`, error);
            setError(`Error al ${editingUserId ? 'actualizar' : 'crear'} el usuario.`);
        }
    };

    const handleEdit = (usuario) => {
        setFormData({
            nombre_usuario: usuario.nombre_usuario,
            email: usuario.email,
            clave_usuario: '', // No mostrar la clave por motivos de seguridad
            roles: usuario.roles[0]?._id || '',
            registros_actividades: usuario.registros_actividades[0]?._id || ''
        });
        setEditingUserId(usuario._id); // Establecer el ID del usuario que se está editando
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL_USUARIOS}/${id}`);
            setUsuarios((prev) => prev.filter((usuario) => usuario._id !== id)); // Refrescar la lista de usuarios
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            setError('Error al eliminar el usuario.');
        }
    };

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <h1 className="title">Gestión de Usuarios</h1>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    name="nombre_usuario"
                    placeholder="Nombre de usuario"
                    value={formData.nombre_usuario}
                    onChange={handleInputChange}
                    required
                    className="input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input"
                />
                <input
                    type="password"
                    name="clave_usuario"
                    placeholder="Clave (oculta)"
                    value={formData.clave_usuario}
                    onChange={handleInputChange}
                    required={!editingUserId} // Requiere clave solo si no es edición
                    className="input"
                />
                <label>Rol</label>
                <select
                    name="roles"
                    value={formData.roles}
                    onChange={(e) => handleSelectChange(e, 'roles')}
                    required
                    className="select"
                >
                    <option value="">Seleccione un rol</option>
                    {roles.map((role) => (
                        <option key={role._id} value={role._id}>
                            {role.nombre_rol}
                        </option>
                    ))}
                </select>

                <label>Registro de Actividad</label>
                <select
                    name="registros_actividades"
                    value={formData.registros_actividades}
                    onChange={(e) => handleSelectChange(e, 'registros_actividades')}
                    className="select"
                >
                    <option value="">Seleccione un registro</option>
                    {registrosActividades.map((registro) => (
                        <option key={registro._id} value={registro._id}>
                            {registro.actividad}
                        </option>
                    ))}
                </select>
                <button type="submit" className="button">
                    {editingUserId ? 'Actualizar Usuario' : 'Crear Usuario'}
                </button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <h2>Lista de Usuarios</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Email</th>
                        <th>Clave</th>
                        <th>Rol</th>
                        <th>Registro de Actividad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario._id}>
                            <td>{usuario.nombre_usuario}</td>
                            <td>{usuario.email}</td>
                            <td>**********</td> {/* Clave oculta por razones de seguridad */}
                            <td>{usuario.roles.map(role => role.nombre_rol).join(', ')}</td>
                            <td>{usuario.registros_actividades.map(reg => reg.actividad).join(', ')}</td>
                            <td>
                                <button onClick={() => handleEdit(usuario)}>Editar</button>
                                <button onClick={() => handleDelete(usuario._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuariosPage;
