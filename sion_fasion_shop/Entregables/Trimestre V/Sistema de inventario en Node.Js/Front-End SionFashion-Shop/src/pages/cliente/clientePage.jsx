import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:3000/api/clientes';

const ClientesPage = () => {
    const [clientes, setClientes] = useState([]);
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [telefonoCliente, setTelefonoCliente] = useState('');
    const [direccionCliente, setDireccionCliente] = useState('');
    const [facturas, setFacturas] = useState([]); // Si necesitas manejar facturas
    const [ordenesDeCompras, setOrdenesDeCompras] = useState([]); // Si necesitas manejar órdenes de compra
    const [modoEdicion, setModoEdicion] = useState(false);
    const [clienteActual, setClienteActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todos los clientes al cargar el componente
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(API_URL);
                setClientes(response.data);
            } catch (err) {
                console.error('Error al obtener los clientes', err);
                setError('Error al obtener los clientes. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };

        fetchClientes();
    }, []);

    // Manejar la creación o edición de un cliente
    const handleCrearCliente = async (e) => {
        e.preventDefault();

        const nuevoCliente = {
            nombre_cliente: nombreCliente,
            email_cliente: emailCliente,
            telefono_cliente: telefonoCliente,
            direccion_cliente: direccionCliente,
            facturas: facturas,
            ordenes_de_compras: ordenesDeCompras,
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${clienteActual._id}`, nuevoCliente);
                setClientes(clientes.map(cliente => 
                    cliente._id === clienteActual._id ? { ...clienteActual, ...nuevoCliente } : cliente
                ));
                setModoEdicion(false);
                setClienteActual(null);
            } else {
                const response = await axios.post(API_URL, nuevoCliente);
                setClientes([...clientes, response.data]);
            }

            // Limpiar formulario después de enviar
            setNombreCliente('');
            setEmailCliente('');
            setTelefonoCliente('');
            setDireccionCliente('');
            setFacturas([]);
            setOrdenesDeCompras([]);
        } catch (err) {
            console.error('Error al guardar el cliente', err);
            setError('Error al guardar el cliente.');
        }
    };

    // Manejar la edición de un cliente
    const handleEditarCliente = (cliente) => {
        setModoEdicion(true);
        setClienteActual(cliente);
        setNombreCliente(cliente.nombre_cliente);
        setEmailCliente(cliente.email_cliente);
        setTelefonoCliente(cliente.telefono_cliente);
        setDireccionCliente(cliente.direccion_cliente);
        setFacturas(cliente.facturas || []);
        setOrdenesDeCompras(cliente.ordenes_de_compras || []);
    };

    // Manejar la eliminación de un cliente
    const handleEliminarCliente = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setClientes(clientes.filter(cliente => cliente._id !== id));
        } catch (err) {
            console.error('Error al eliminar el cliente', err);
            setError('Error al eliminar el cliente.');
        }
    };

    // Mostrar cargando mientras se obtienen los clientes
    if (loading) {
        return <div>Cargando clientes...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Gestión de Clientes</h1>

            {/* Formulario para crear o editar cliente */}
            <form onSubmit={handleCrearCliente}>
                <div>
                    <label>Nombre del Cliente:</label>
                    <input 
                        type="text" 
                        value={nombreCliente} 
                        onChange={(e) => setNombreCliente(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email del Cliente:</label>
                    <input 
                        type="email" 
                        value={emailCliente} 
                        onChange={(e) => setEmailCliente(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Teléfono del Cliente:</label>
                    <input 
                        type="text" 
                        value={telefonoCliente} 
                        onChange={(e) => setTelefonoCliente(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Dirección del Cliente:</label>
                    <input 
                        type="text" 
                        value={direccionCliente} 
                        onChange={(e) => setDireccionCliente(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Facturas (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={facturas.join(',')} 
                        onChange={(e) => setFacturas(e.target.value.split(',').map(factura => factura.trim()))}
                    />
                </div>
                <div>
                    <label>Órdenes de Compra (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={ordenesDeCompras.join(',')} 
                        onChange={(e) => setOrdenesDeCompras(e.target.value.split(',').map(orden => orden.trim()))}
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Cliente' : 'Crear Cliente'}</button>
            </form>

            {/* Lista de clientes */}
            <h2>Lista de Clientes</h2>
            {clientes.length > 0 ? (
                <ul>
                    {clientes.map(cliente => (
                        <li key={cliente._id}>
                            <strong>Nombre:</strong> {cliente.nombre_cliente} | 
                            <strong> Email:</strong> {cliente.email_cliente || 'N/A'} |
                            <strong> Teléfono:</strong> {cliente.telefono_cliente || 'N/A'} |
                            <strong> Dirección:</strong> {cliente.direccion_cliente || 'N/A'} |
                            <strong> Facturas:</strong> {cliente.facturas?.join(', ') || 'Sin facturas'} |
                            <strong> Órdenes de Compra:</strong> {cliente.ordenes_de_compras?.join(', ') || 'Sin órdenes'}
                            <button onClick={() => handleEditarCliente(cliente)}>Editar</button>
                            <button onClick={() => handleEliminarCliente(cliente._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay clientes disponibles</p>
            )}
        </div>
    );  
};

export default ClientesPage;
