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
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1 className="title">Gestión de Inventario</h1>
            </div>
            <div className=" w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleSubmit} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{editando ? 'Actualizar' : 'Crear Inventario'}</button>

                    <label className="w-100"> Seleccione un producto: </label>
                        <select className="w-100"
                            value={nuevoInventario.id_producto}
                            onChange={(e) => setNuevoInventario({ ...nuevoInventario, id_producto: e.target.value })}
                            required>
                            <option value="">Seleccione un producto</option>
                            {productos.map((producto) => (
                                <option key={producto._id} value={producto._id}>
                                    {producto.nombre_producto}
                                </option>
                            ))}
                        </select>
                    
                    <label> Stock Inicial:  </label>
                    <input className="w-100"
                        type="number"
                        placeholder="Stock Inicial"
                        value={nuevoInventario.stock_inicial}
                        onChange={(e) => setNuevoInventario({ ...nuevoInventario, stock_inicial: Number(e.target.value) })}
                        required
                    />
                    <label className="w-100"> Stock Actual: </label>
                    <input className="w-100"
                            type="number"
                            placeholder="Stock Actual"
                            value={nuevoInventario.stock_actual}
                            onChange={(e) => setNuevoInventario({ ...nuevoInventario, stock_actual: Number(e.target.value) })}
                            required
                        />
                    <label className="w-100">  Saldo:  </label>
                    <input className="w-100"
                            type="number"
                            placeholder="Saldo"
                            value={nuevoInventario.saldo}
                            onChange={(e) => setNuevoInventario({ ...nuevoInventario, saldo: Number(e.target.value) })}
                            required
                        />
                   
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Inventarios</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventarios.map((inventario) => (
                                <tr key={inventario._id}>
                                    <td> {`Producto: ${getProductNameById(inventario.id_producto)}, Stock Inicial: ${inventario.stock_inicial}, Stock Actual: ${inventario.stock_actual}, Saldo: ${inventario.saldo}`}
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEdit(inventario)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleDelete(inventario._id)}>Eliminar</button>
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

export default Inventario;
