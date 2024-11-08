import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const API_URL = 'https://localhost:3000/api/facturas';

const FacturasPage = () => {
    const [facturas, setFacturas] = useState([]);
    const [fechaEmision, setFechaEmision] = useState('');
    const [subTotal, setSubTotal] = useState('');
    const [impuesto, setImpuesto] = useState('');
    const [total, setTotal] = useState('');
    const [cliente, setCliente] = useState('');
    const [metodosDePago, setMetodosDePago] = useState([]);
    const [ordenesDeCompra, setOrdenesDeCompra] = useState([]);
    const [productos, setProductos] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [facturaActual, setFacturaActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const convertDecimal = (value) => {
        return value && typeof value === 'object' && value.$numberDecimal
            ? parseFloat(value.$numberDecimal)
            : value;
    };

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data.map(factura => ({
                    ...factura,
                    sub_total_factura: convertDecimal(factura.sub_total_factura),
                    impuesto_factura: convertDecimal(factura.impuesto_factura),
                    total_factura: convertDecimal(factura.total_factura),
                }));
                setFacturas(data);
            } catch (err) {
                console.error('Error al obtener las facturas:', err);
                setError('Error al obtener las facturas. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };
        fetchFacturas();
    }, []);

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
            resetForm();
        } catch (err) {
            console.error('Error al guardar la factura:', err);
            setError('Error al guardar la factura.');
        }
    };

    const resetForm = () => {
        setFechaEmision('');
        setSubTotal('');
        setImpuesto('');
        setTotal('');
        setCliente('');
        setMetodosDePago([]);
        setOrdenesDeCompra([]);
        setProductos([]);
    };

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

    const handleEliminarFactura = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setFacturas(facturas.filter(factura => factura._id !== id));
        } catch (err) {
            console.error('Error al eliminar la factura:', err);
            setError('Error al eliminar la factura.');
        }
    };

    if (loading) return <div>Cargando facturas...</div>;
    if (error) return <div>{error}</div>;

    const columns = [
        { name: 'Fecha de Emisión', selector: row => new Date(row.fecha_emision_factura).toLocaleDateString(), sortable: true },
        { name: 'Subtotal', selector: row => row.sub_total_factura, sortable: true },
        { name: 'Impuesto', selector: row => row.impuesto_factura, sortable: true },
        { name: 'Total', selector: row => row.total_factura, sortable: true },
        {
            name: 'Acciones',
            cell: row => (
                <div className="action-buttons">
                    <button className="edit-button" onClick={() => handleEditarFactura(row)}>Editar</button>
                    <button className="delete-button" onClick={() => handleEliminarFactura(row._id)}>Eliminar</button>
                </div>
            ),
        },
    ];

    return (
        <div className="facturas-page">
            <h1>Gestión de Facturas</h1>
            <form onSubmit={handleCrearFactura} className="factura-form">
                <div className="horizontal-form-group">
                    <div className="form-group">
                        <label>Fecha de Emisión:</label>
                        <input type="date" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Subtotal:</label>
                        <input type="number" value={subTotal} onChange={(e) => setSubTotal(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Impuesto:</label>
                        <input type="number" value={impuesto} onChange={(e) => setImpuesto(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Total:</label>
                        <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} required />
                    </div>
                </div>
                <button type="submit" className="submit-button">
                    {modoEdicion ? 'Actualizar Factura' : 'Crear Factura'}
                </button>
            </form>
            <h2>Lista de Facturas</h2>
            <DataTable
                columns={columns}
                data={facturas}
                pagination
                paginationPerPage={5}
                highlightOnHover
                pointerOnHover
            />
        </div>
    );
};

export default FacturasPage;
