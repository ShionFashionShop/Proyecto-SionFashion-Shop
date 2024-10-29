import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:3000/api/proveedores';

const ProveedoresPage = () => {
    const [proveedores, setProveedores] = useState([]);
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [contactoProveedor, setContactoProveedor] = useState('');
    const [emailProveedor, setEmailProveedor] = useState('');
    const [idCiudad, setIdCiudad] = useState(null); // Puedes implementar un selector para ciudades si es necesario
    const [productos, setProductos] = useState([]); // ID de productos, similar al manejo de tiendas
    const [modoEdicion, setModoEdicion] = useState(false);
    const [proveedorActual, setProveedorActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todos los proveedores al cargar el componente
    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await axios.get(API_URL);
                setProveedores(response.data);
            } catch (err) {
                console.error('Error al obtener los proveedores', err);
                setError('Error al obtener los proveedores. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };

        fetchProveedores();
    }, []);

    // Manejar la creación o edición de un proveedor
    const handleCrearProveedor = async (e) => {
        e.preventDefault();

        const nuevoProveedor = {
            nombre_proveedor: nombreProveedor,
            contacto_proveedor: contactoProveedor,
            email_proveedor: emailProveedor,
            id_ciudad: idCiudad,
            productos: productos,
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${proveedorActual._id}`, nuevoProveedor);
                setProveedores(proveedores.map(proveedor => 
                    proveedor._id === proveedorActual._id ? { ...proveedorActual, ...nuevoProveedor } : proveedor
                ));
                setModoEdicion(false);
                setProveedorActual(null);
            } else {
                const response = await axios.post(API_URL, nuevoProveedor);
                setProveedores([...proveedores, response.data]);
            }

            // Limpiar formulario después de enviar
            setNombreProveedor('');
            setContactoProveedor('');
            setEmailProveedor('');
            setIdCiudad(null);
            setProductos([]);
        } catch (err) {
            console.error('Error al guardar el proveedor', err);
            setError('Error al guardar el proveedor.');
        }
    };

    // Manejar la edición de un proveedor
    const handleEditarProveedor = (proveedor) => {
        setModoEdicion(true);
        setProveedorActual(proveedor);
        setNombreProveedor(proveedor.nombre_proveedor);
        setContactoProveedor(proveedor.contacto_proveedor);
        setEmailProveedor(proveedor.email_proveedor);
        setIdCiudad(proveedor.id_ciudad);
        setProductos(proveedor.productos || []); // Cargar lista de productos
    };

    // Manejar la eliminación de un proveedor
    const handleEliminarProveedor = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setProveedores(proveedores.filter(proveedor => proveedor._id !== id));
        } catch (err) {
            console.error('Error al eliminar el proveedor', err);
            setError('Error al eliminar el proveedor.');
        }
    };

    // Mostrar cargando mientras se obtienen los proveedores
    if (loading) {
        return <div>Cargando proveedores...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Gestión de Proveedores</h1>

            {/* Formulario para crear o editar proveedor */}
            <form onSubmit={handleCrearProveedor}>
                <div>
                    <label>Nombre del Proveedor:</label>
                    <input 
                        type="text" 
                        value={nombreProveedor} 
                        onChange={(e) => setNombreProveedor(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Contacto del Proveedor:</label>
                    <input 
                        type="text" 
                        value={contactoProveedor} 
                        onChange={(e) => setContactoProveedor(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email del Proveedor:</label>
                    <input 
                        type="email" 
                        value={emailProveedor} 
                        onChange={(e) => setEmailProveedor(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>ID Ciudad:</label>
                    <input 
                        type="text" 
                        value={idCiudad} 
                        onChange={(e) => setIdCiudad(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Productos (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={productos.join(',')} 
                        onChange={(e) => setProductos(e.target.value.split(',').map(prod => prod.trim()))} 
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Proveedor' : 'Crear Proveedor'}</button>
            </form>

            {/* Lista de proveedores */}
            <h2>Lista de Proveedores</h2>
            {proveedores.length > 0 ? (
                <ul>
                    {proveedores.map(proveedor => (
                        <li key={proveedor._id}>
                            <strong>Nombre:</strong> {proveedor.nombre_proveedor} | 
                            <strong> Contacto:</strong> {proveedor.contacto_proveedor || 'N/A'} | 
                            <strong> Email:</strong> {proveedor.email_proveedor || 'N/A'} | 
                            <strong> ID Ciudad:</strong> {proveedor.id_ciudad || 'N/A'} | 
                            <strong> Productos:</strong> {proveedor.productos?.join(', ') || 'Sin productos'}
                            <button onClick={() => handleEditarProveedor(proveedor)}>Editar</button>
                            <button onClick={() => handleEliminarProveedor(proveedor._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay proveedores disponibles</p>
            )}
        </div>
    );  
};

export default ProveedoresPage;
