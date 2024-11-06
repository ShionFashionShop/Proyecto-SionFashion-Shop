import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:3000/api/inventario';  // URL de la API para inventario
const PRODUCTOS_API_URL = 'https://localhost:3000/api/productos'; // URL de la API para obtener productos.

const Inventario = () => {
    const [inventarios, setInventarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [nuevoInventario, setNuevoInventario] = useState({
        id_producto: '',
        stock_inicial: 0,
        stock_actual: 0,
        saldo: 0
    });
    const [editando, setEditando] = useState(false);
    const [inventarioEditado, setInventarioEditado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todos los inventarios y productos al cargar la página
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inventariosResponse, productosResponse] = await Promise.all([
                    axios.get(API_URL),
                    axios.get(PRODUCTOS_API_URL)
                ]);
                setInventarios(inventariosResponse.data);
                setProductos(productosResponse.data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setError('Error al cargar los datos. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Crear o actualizar inventario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await axios.put(`${API_URL}/${inventarioEditado._id}`, nuevoInventario);
                setInventarios(inventarios.map(inventario => 
                    inventario._id === inventarioEditado._id ? { ...inventarioEditado, ...nuevoInventario } : inventario
                ));
                setEditando(false);
                setInventarioEditado(null);
            } else {
                const response = await axios.post(API_URL, nuevoInventario);
                setInventarios([...inventarios, response.data]);
            }
            // Reiniciar el formulario
            setNuevoInventario({ id_producto: '', stock_inicial: 0, stock_actual: 0, saldo: 0 });
        } catch (error) {
            console.error("Error al guardar el inventario:", error);
            setError('Error al guardar el inventario.');
        }
    };

    // Editar inventario
    const handleEdit = (inventario) => {
        setNuevoInventario({
            id_producto: inventario.id_producto,
            stock_inicial: inventario.stock_inicial,
            stock_actual: inventario.stock_actual,
            saldo: inventario.saldo
        });
        setEditando(true);
        setInventarioEditado(inventario);
    };

    // Eliminar inventario
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setInventarios(inventarios.filter(inventario => inventario._id !== id));
        } catch (error) {
            console.error("Error al eliminar el inventario:", error);
            setError('Error al eliminar el inventario.');
        }
    };

    // Obtener el nombre del producto por su ID
    const getProductNameById = (id) => {
        const producto = productos.find(producto => producto._id.toString() === id.toString());
        return producto ? producto.nombre_producto : 'Producto no encontrado';
    };

    // Mostrar cargando mientras se obtienen los datos
    if (loading) {
        return <div>Cargando inventarios...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Gestión de Inventario</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Seleccione un producto:
                    <select
                        value={nuevoInventario.id_producto}
                        onChange={(e) => setNuevoInventario({ ...nuevoInventario, id_producto: e.target.value })}
                        required
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto._id} value={producto._id}>
                                {producto.nombre_producto}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Stock Inicial:
                    <input
                        type="number"
                        placeholder="Stock Inicial"
                        value={nuevoInventario.stock_inicial}
                        onChange={(e) => setNuevoInventario({ ...nuevoInventario, stock_inicial: Number(e.target.value) })}
                        required
                    />
                </label>
                <label>
                    Stock Actual:
                    <input
                        type="number"
                        placeholder="Stock Actual"
                        value={nuevoInventario.stock_actual}
                        onChange={(e) => setNuevoInventario({ ...nuevoInventario, stock_actual: Number(e.target.value) })}
                        required
                    />
                </label>
                <label>
                    Saldo:
                    <input
                        type="number"
                        placeholder="Saldo"
                        value={nuevoInventario.saldo}
                        onChange={(e) => setNuevoInventario({ ...nuevoInventario, saldo: Number(e.target.value) })}
                        required
                    />
                </label>
                <button type="submit">{editando ? 'Actualizar' : 'Crear Inventario'}</button>
            </form>

            <h2>Lista de Inventarios</h2>
            <ul>
                {inventarios.map((inventario) => (
                    <li key={inventario._id}>
                        {`Producto: ${getProductNameById(inventario.id_producto)}, Stock Inicial: ${inventario.stock_inicial}, Stock Actual: ${inventario.stock_actual}, Saldo: ${inventario.saldo}`}
                        <button onClick={() => handleEdit(inventario)}>Editar</button>
                        <button onClick={() => handleDelete(inventario._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventario;
