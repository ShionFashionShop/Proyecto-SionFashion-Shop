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
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1>Gestión de Proveedores</h1>
            </div>
            <div className="w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleCrearProveedor} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{modoEdicion ? 'Actualizar Proveedor' : 'Crear Proveedor'}</button>
                    <label className="w-100">Nombre del Proveedor:</label>
                    <input className="w-100" type="text" value={nombreProveedor} onChange={(e) => setNombreProveedor(e.target.value)} required />
                    <label className="w-100">Contacto del Proveedor:</label>
                    <input className="w-100" type="text" value={contactoProveedor} onChange={(e) => setContactoProveedor(e.target.value)} />
                    <label className="w-100">Email del Proveedor:</label>
                    <input className="w-100" type="email" value={emailProveedor} onChange={(e) => setEmailProveedor(e.target.value)} required />
                    <label className="w-100">ID Ciudad:</label>
                    <input className="w-100" type="text" value={idCiudad} onChange={(e) => setIdCiudad(e.target.value)} />
                    <label className="w-100">Productos (IDs separados por coma):</label>
                    <input className="w-100" type="text" value={productos.join(',')} onChange={(e) => setProductos(e.target.value.split(',').map(prod => prod.trim()))} />
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Proveedores</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th >Nombre</th>
                                <th>Contacto</th>
                                <th>ID Ciudad</th>
                                <th>Productos</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedores.map((proveedore) => (
                                <tr key={proveedore._id}>
                                    <td>{proveedore.nombre_proveedor}</td>
                                    <td>{proveedore.contacto_proveedor}</td>
                                    <td>{proveedore.id_ciudad}</td>
                                    <td>{proveedore.productos}</td>
                                    <td>{proveedore.email_proveedor}</td>

                                    <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEditarProveedor(proveedor)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEliminarProveedor(proveedor._id)}>Eliminar</button>
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
export default ProveedoresPage;