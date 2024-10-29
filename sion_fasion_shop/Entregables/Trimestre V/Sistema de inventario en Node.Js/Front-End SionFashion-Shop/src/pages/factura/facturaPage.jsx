import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:3000/api/facturas';

const FacturasPage = () => {
    const [facturas, setFacturas] = useState([]);
    const [fechaEmision, setFechaEmision] = useState('');
    const [subTotal, setSubTotal] = useState('');
    const [impuesto, setImpuesto] = useState('');
    const [total, setTotal] = useState('');
    const [cliente, setCliente] = useState(''); // ID del cliente
    const [metodosDePago, setMetodosDePago] = useState([]); // IDs de métodos de pago
    const [ordenesDeCompra, setOrdenesDeCompra] = useState([]); // IDs de órdenes de compra
    const [productos, setProductos] = useState([]); // IDs de productos
    const [modoEdicion, setModoEdicion] = useState(false);
    const [facturaActual, setFacturaActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todas las facturas al cargar el componente
    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await axios.get(API_URL);
                setFacturas(response.data);
            } catch (err) {
                console.error('Error al obtener las facturas', err);
                setError('Error al obtener las facturas. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };

        fetchFacturas();
    }, []);

    // Manejar la creación o edición de una factura
    const handleCrearFactura = async (e) => {
        e.preventDefault();

        const nuevaFactura = {
            fecha_emision_factura: fechaEmision,
            sub_total_factura: subTotal,
            impuesto_factura: impuesto,
            total_factura: total,
            id_clienteNavigation: cliente,
            metodos_de_pagos: metodosDePago,
            ordenes_de_compras: ordenesDeCompra,
            productos: productos,
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${facturaActual._id}`, nuevaFactura);
                setFacturas(facturas.map(factura => 
                    factura._id === facturaActual._id ? { ...facturaActual, ...nuevaFactura } : factura
                ));
                setModoEdicion(false);
                setFacturaActual(null);
            } else {
                const response = await axios.post(API_URL, nuevaFactura);
                setFacturas([...facturas, response.data]);
            }

            // Limpiar formulario después de enviar
            setFechaEmision('');
            setSubTotal('');
            setImpuesto('');
            setTotal('');
            setCliente('');
            setMetodosDePago([]);
            setOrdenesDeCompra([]);
            setProductos([]);
        } catch (err) {
            console.error('Error al guardar la factura', err);
            setError('Error al guardar la factura.');
        }
    };

    // Manejar la edición de una factura
    const handleEditarFactura = (factura) => {
        setModoEdicion(true);
        setFacturaActual(factura);
        setFechaEmision(factura.fecha_emision_factura);
        setSubTotal(factura.sub_total_factura);
        setImpuesto(factura.impuesto_factura);
        setTotal(factura.total_factura);
        setCliente(factura.id_clienteNavigation);
        setMetodosDePago(factura.metodos_de_pagos || []);
        setOrdenesDeCompra(factura.ordenes_de_compras || []);
        setProductos(factura.productos || []);
    };

    // Manejar la eliminación de una factura
    const handleEliminarFactura = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setFacturas(facturas.filter(factura => factura._id !== id));
        } catch (err) {
            console.error('Error al eliminar la factura', err);
            setError('Error al eliminar la factura.');
        }
    };

    // Mostrar cargando mientras se obtienen las facturas
    if (loading) {
        return <div>Cargando facturas...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Gestión de Facturas</h1>

            {/* Formulario para crear o editar factura */}
            <form onSubmit={handleCrearFactura}>
                <div>
                    <label>Fecha de Emisión:</label>
                    <input 
                        type="date" 
                        value={fechaEmision} 
                        onChange={(e) => setFechaEmision(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Subtotal:</label>
                    <input 
                        type="number" 
                        value={subTotal} 
                        onChange={(e) => setSubTotal(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Impuesto:</label>
                    <input 
                        type="number" 
                        value={impuesto} 
                        onChange={(e) => setImpuesto(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Total:</label>
                    <input 
                        type="number" 
                        value={total} 
                        onChange={(e) => setTotal(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>ID del Cliente:</label>
                    <input 
                        type="text" 
                        value={cliente} 
                        onChange={(e) => setCliente(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Métodos de Pago (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={metodosDePago.join(',')} 
                        onChange={(e) => setMetodosDePago(e.target.value.split(','))}
                    />
                </div>
                <div>
                    <label>Órdenes de Compra (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={ordenesDeCompra.join(',')} 
                        onChange={(e) => setOrdenesDeCompra(e.target.value.split(','))}
                    />
                </div>
                <div>
                    <label>Productos (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={productos.join(',')} 
                        onChange={(e) => setProductos(e.target.value.split(','))}
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Factura' : 'Crear Factura'}</button>
            </form>

            {/* Lista de facturas */}
            <h2>Lista de Facturas</h2>
            {facturas.length > 0 ? (
                <ul>
                    {facturas.map(factura => (
                        <li key={factura._id}>
                            <strong>Fecha de Emisión:</strong> {new Date(factura.fecha_emision_factura).toLocaleDateString()} | 
                            <strong> Subtotal:</strong> {factura.sub_total_factura} | 
                            <strong> Impuesto:</strong> {factura.impuesto_factura} |
                            <strong> Total:</strong> {factura.total_factura} |
                        {/* <strong> Cliente ID:</strong> {factura.id_clienteNavigation || 'N/A'} |
                            <strong> Métodos de Pago:</strong> {(factura.metodos_de_pagos && Array.isArray(factura.metodos_de_pagos)) ? factura.metodos_de_pagos.join(', ') : 'Sin métodos de pago'} |
                            <strong> Órdenes de Compra:</strong> {(factura.ordenes_de_compras && Array.isArray(factura.ordenes_de_compras)) ? factura.ordenes_de_compras.join(', ') : 'Sin órdenes de compra'} |
                            <strong> Productos:</strong> {(factura.productos && Array.isArray(factura.productos)) ? factura.productos.join(', ') : 'Sin productos'}*/}
                            <button onClick={() => handleEditarFactura(factura)}>Editar</button>
                            <button onClick={() => handleEliminarFactura(factura._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay facturas disponibles</p>
            )}
        </div>
    );  
};

export default FacturasPage;
