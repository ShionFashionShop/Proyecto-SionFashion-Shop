import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:3000/api/historial-inventario';

const Historial_inventarioPage = () => {
    const [historial, setHistorial] = useState([]);
    const [idProducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [tipoCambio, setTipoCambio] = useState(''); // entrada o salida
    const [fechaCambio, setFechaCambio] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);
    const [historialActual, setHistorialActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todos los registros al cargar el componente
    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await axios.get(API_URL);
                setHistorial(response.data);
            } catch (err) {
                console.error('Error al obtener el historial de inventario', err);
                setError('Error al obtener el historial de inventario.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistorial();
    }, []);

    // Manejar la creación o actualización del historial de inventario
    const handleGuardarHistorial = async (e) => {
        e.preventDefault();

        const nuevoHistorial = {
            id_producto: idProducto,
            cantidad: cantidad,
            tipo_cambio: tipoCambio,
            fecha_cambio: new Date(fechaCambio),
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${historialActual._id}`, nuevoHistorial);
                setHistorial(historial.map(item => 
                    item._id === historialActual._id ? { ...historialActual, ...nuevoHistorial } : item
                ));
                setModoEdicion(false);
                setHistorialActual(null);
            } else {
                const response = await axios.post(API_URL, nuevoHistorial);
                setHistorial([...historial, response.data]);
            }

            // Limpiar formulario después de enviar
            setIdProducto('');
            setCantidad('');
            setTipoCambio('');
            setFechaCambio('');
        } catch (err) {
            console.error('Error al guardar el historial de inventario', err);
            setError('Error al guardar el historial de inventario.');
        }
    };

    // Manejar la edición de un historial de inventario
    const handleEditarHistorial = (item) => {
        setModoEdicion(true);
        setHistorialActual(item);
        setIdProducto(item.id_producto);
        setCantidad(item.cantidad);
        setTipoCambio(item.tipo_cambio);
        setFechaCambio(new Date(item.fecha_cambio).toISOString().split('T')[0]); // Formato YYYY-MM-DD
    };

    // Manejar la eliminación de un historial de inventario
    const handleEliminarHistorial = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setHistorial(historial.filter(item => item._id !== id));
        } catch (err) {
            console.error('Error al eliminar el historial de inventario', err);
            setError('Error al eliminar el historial de inventario.');
        }
    };

    // Mostrar cargando mientras se obtienen los historiales
    if (loading) {
        return <div>Cargando historial de inventario...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Gestión del Historial de Inventario</h1>

            {/* Formulario para crear o editar historial de inventario */}
            <form onSubmit={handleGuardarHistorial}>
                <div>
                    <label>ID del Producto:</label>
                    <input 
                        type="text" 
                        value={idProducto} 
                        onChange={(e) => setIdProducto(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input 
                        type="number" 
                        value={cantidad} 
                        onChange={(e) => setCantidad(e.target.value)} 
                        min="0" 
                        required 
                    />
                </div>
                <div>
                    <label>Tipo de Cambio:</label>
                    <select 
                        value={tipoCambio} 
                        onChange={(e) => setTipoCambio(e.target.value)} 
                        required
                    >
                        <option value="">Seleccione</option>
                        <option value="entrada">Entrada</option>
                        <option value="salida">Salida</option>
                    </select>
                </div>
                <div>
                    <label>Fecha de Cambio:</label>
                    <input 
                        type="date" 
                        value={fechaCambio} 
                        onChange={(e) => setFechaCambio(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Historial' : 'Crear Historial'}</button>
            </form>

            {/* Lista de historiales de inventario */}
            <h2>Lista de Historiales de Inventario</h2>
            {historial.length > 0 ? (
                <ul>
                    {historial.map(item => (
                        <li key={item._id}>
                            <strong>ID Producto:</strong> {item.id_producto} | 
                            <strong> Cantidad:</strong> {item.cantidad} | 
                            <strong> Tipo de Cambio:</strong> {item.tipo_cambio} | 
                            <strong> Fecha de Cambio:</strong> {new Date(item.fecha_cambio).toLocaleDateString()} 
                            <button onClick={() => handleEditarHistorial(item)}>Editar</button>
                            <button onClick={() => handleEliminarHistorial(item._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay registros de historial de inventario disponibles</p>
            )}
        </div>
    );  
};

export default Historial_inventarioPage;
