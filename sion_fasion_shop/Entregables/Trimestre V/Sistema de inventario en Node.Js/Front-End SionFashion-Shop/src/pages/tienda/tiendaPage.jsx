import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TiendaPage = () => {
    const [tiendas, setTiendas] = useState([]);
    const [formData, setFormData] = useState({
        nombre_tienda: '',
        telefono_tienda: '',
        ubicacion_tienda: '',
        id_ciudad: '',
        id_empresa: ''
    });
    const [editingId, setEditingId] = useState(null);

    // Función para obtener todas las tiendas
    const obtenerTiendas = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/tiendas');
            setTiendas(response.data);
        } catch (error) {
            console.error('Error al obtener las tiendas:', error);
        }
    };

    // Manejar el cambio en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para crear o actualizar una tienda
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Actualizar tienda existente
                await axios.put(`https://localhost:3000/api/tiendas/${editingId}`, formData);
            } else {
                // Crear nueva tienda
                await axios.post('https://localhost:3000/api/tiendas', formData);
            }
            setFormData({
                nombre_tienda: '',
                telefono_tienda: '',
                ubicacion_tienda: '',
                id_ciudad: '',
                id_empresa: ''
            });
            setEditingId(null);
            obtenerTiendas();
        } catch (error) {
            console.error('Error al guardar la tienda:', error);
        }
    };

    // Función para editar una tienda
    const handleEdit = (tienda) => {
        setFormData({
            nombre_tienda: tienda.nombre_tienda,
            telefono_tienda: tienda.telefono_tienda,
            ubicacion_tienda: tienda.ubicacion_tienda,
            id_ciudad: tienda.id_ciudad,
            id_empresa: tienda.id_empresa
        });
        setEditingId(tienda._id);
    };

    // Función para eliminar una tienda
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:3000/api/tiendas/${id}`);
            obtenerTiendas();
        } catch (error) {
            console.error('Error al eliminar la tienda:', error);
        }
    };

    // Cargar las tiendas al montar el componente
    useEffect(() => {
        obtenerTiendas();
    }, []);

    return (
        <div>
            <h2>{editingId ? 'Actualizar Tienda' : 'Crear Tienda'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre_tienda"
                    placeholder="Nombre de la tienda"
                    value={formData.nombre_tienda}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="telefono_tienda"
                    placeholder="Teléfono de la tienda"
                    value={formData.telefono_tienda}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="ubicacion_tienda"
                    placeholder="Ubicación de la tienda"
                    value={formData.ubicacion_tienda}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="id_ciudad"
                    placeholder="ID de la ciudad"
                    value={formData.id_ciudad}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="id_empresa"
                    placeholder="ID de la empresa"
                    value={formData.id_empresa}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
            </form>

            <h2>Lista de Tiendas</h2>
            <ul>
                {tiendas.map((tienda) => (
                    <li key={tienda._id}>
                        <strong>{tienda.nombre_tienda}</strong>
                        <p>Teléfono: {tienda.telefono_tienda}</p>
                        <p>Ubicación: {tienda.ubicacion_tienda}</p>
                        <p>ID Ciudad: {tienda.id_ciudad}</p>
                        <p>ID Empresa: {tienda.id_empresa}</p>
                        <button onClick={() => handleEdit(tienda)}>Editar</button>
                        <button onClick={() => handleDelete(tienda._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TiendaPage;
