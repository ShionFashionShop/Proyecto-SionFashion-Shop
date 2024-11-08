import React, { useEffect, useState } from 'react';
import axios from 'axios';


const API_URL = 'https://localhost:3000/api/alertas';  // Asegúrate de que el backend esté corriendo aquí.
const PRODUCTOS_API_URL = 'https://localhost:3000/api/productos'; // URL de la API para obtener productos.

const AlertasStockPage = () => {
    const [alertas, setAlertas] = useState([]);
    const [productos, setProductos] = useState([]); // Estado para productos
    const [nivelMinimo, setNivelMinimo] = useState('');
    const [fechaAlerta, setFechaAlerta] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(''); // Estado para producto seleccionado
    const [modoEdicion, setModoEdicion] = useState(false);
    const [alertaActual, setAlertaActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todas las alertas y productos al cargar el componente
    useEffect(() => {
        const fetchAlertas = async () => {
            try {
                const response = await axios.get(API_URL);
                setAlertas(response.data);
            } catch (err) {
                console.error('Error al obtener las alertas', err);
                setError('Error al obtener las alertas. Verifica la API.');
            }
        };

        const fetchProductos = async () => { // Nueva función para obtener productos
            try {
                const response = await axios.get(PRODUCTOS_API_URL);
                setProductos(response.data);
            } catch (err) {
                console.error('Error al obtener los productos', err);
                setError('Error al obtener los productos. Verifica la API.');
            }
        };

        fetchAlertas();
        fetchProductos(); // Llama a la función para obtener productos
        setLoading(false);
    }, []);

    // Manejar la creación o edición de una alerta
    const handleCrearAlerta = async (e) => {
        e.preventDefault();

        const nuevaAlerta = {
            nivel_minimo: nivelMinimo,
            fecha_alerta: fechaAlerta,
            id_productoNavigation: productoSeleccionado  // Agregar el producto seleccionado
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${alertaActual._id}`, nuevaAlerta);
                setAlertas(alertas.map(alerta =>
                    alerta._id === alertaActual._id ? { ...alertaActual, ...nuevaAlerta } : alerta
                ));
                setModoEdicion(false);
                setAlertaActual(null);
            } else {
                const response = await axios.post(API_URL, nuevaAlerta);
                setAlertas([...alertas, response.data]);
            }

            // Limpiar formulario después de enviar
            setNivelMinimo('');
            setFechaAlerta('');
            setProductoSeleccionado(''); // Limpiar el producto seleccionado
        } catch (err) {
            console.error('Error al guardar la alerta', err);
            setError('Error al guardar la alerta.');
        }
    };

    // Manejar la edición de una alerta
    const handleEditarAlerta = (alerta) => {
        setModoEdicion(true);
        setAlertaActual(alerta);
        setNivelMinimo(alerta.nivel_minimo);
        setFechaAlerta(alerta.fecha_alerta);
        setProductoSeleccionado(alerta.id_productoNavigation); // Establecer el producto seleccionado
    };

    // Manejar la eliminación de una alerta
    const handleEliminarAlerta = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setAlertas(alertas.filter(alerta => alerta._id !== id));
        } catch (err) {
            console.error('Error al eliminar la alerta', err);
            setError('Error al eliminar la alerta.');
        }
    };

    // Mostrar cargando mientras se obtienen las alertas
    if (loading) {
        return <div>Cargando alertas...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1>Gestión de Alertas de Stock</h1>
            </div>
            <div className="w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleCrearAlerta} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{modoEdicion ? 'Actualizar Alerta' : 'Crear Alerta'}</button>
                    <label className="w-100">Nivel Mínimo:</label>
                    <input className="w-100" type="number" value={nivelMinimo} onChange={(e) => setNivelMinimo(e.target.value)} required />
                    <label className="w-100">Fecha Alerta:</label>
                    <input className="w-100" type="date" value={fechaAlerta} onChange={(e) => setFechaAlerta(e.target.value)} required />
                    <label className="w-100">Producto:</label>
                    <select className="w-100" value={productoSeleccionado} onChange={(e) => setProductoSeleccionado(e.target.value)} required >
                        <option value="">Seleccione un producto</option>
                        {productos.map(producto => (
                            <option key={producto._id} value={producto._id}>
                                {producto.nombre_producto} {/* Cambiado para usar 'nombre_producto' */}
                            </option>
                        ))}
                    </select>
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Usuarios</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nivel Mínimo</th>
                                <th>Fecha Alerta</th>
                                <th>Producto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alertas.map(alerta => (
                                <tr key={alerta._id}>
                                    <td>{alerta.nivel_minimo}
                                    </td>
                                    <td>
                                        {new Date(alerta.fecha_alerta).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {productos.find(producto => producto._id === alerta.id_productoNavigation)?.nombre_producto || 'Producto no encontrado'}
                                    </td>
                                     <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEditarAlerta(alerta)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEliminarAlerta(alerta._id)}>Eliminar</button>

                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
                <div className="p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <h2>Lista de Alertas de Stock</h2>
                    {
                        alertas.length > 0 ? (
                            <ul>
                                
                            </ul>
                        ) : (
                            <p>No hay alertas disponibles</p>
                        )
                    }
                </div >
            </div>

        </div >
    );
};

export default AlertasStockPage;
