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
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1 className="title">Gestión del Historial de Inventario</h1>
            </div>
            <div className=" w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleGuardarHistorial} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{modoEdicion ? 'Actualizar Historial' : 'Crear Historial'}</button>

                    <label className="w-100">ID del Producto:</label>
                    <input className="w-100" type="text" value={idProducto} onChange={(e) => setIdProducto(e.target.value)}
                        required
                    />
                    <label className="w-100">Cantidad:</label>
                    <input className="w-100" type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)}
                        min="0"
                        required
                    />
                    <label className="w-100">Tipo de Cambio:</label>
                    <select className="w-100" value={tipoCambio} onChange={(e) => setTipoCambio(e.target.value)}
                        required
                    >
                        <option value="">Seleccione</option>
                        <option value="entrada">Entrada</option>
                        <option value="salida">Salida</option>
                    </select>
                    <label className="w-100">Fecha de Cambio:</label>
                    <input className="w-100" type="date" value={fechaCambio} onChange={(e) => setFechaCambio(e.target.value)}
                        required
                    />
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Usuarios</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Producto</th>
                                <th>Cantidad</th>
                                <th>Tipo de Cambio</th>
                                <th>Fecha de Cambio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.id_producto}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{item.tipo_cambio}</td> {/* Clave oculta por razones de seguridad */}
                                    <td>{new Date(item.fecha_cambio).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEditarHistorial(item)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEliminarHistorial(item._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >

    );

};
export default Historial_inventarioPage;