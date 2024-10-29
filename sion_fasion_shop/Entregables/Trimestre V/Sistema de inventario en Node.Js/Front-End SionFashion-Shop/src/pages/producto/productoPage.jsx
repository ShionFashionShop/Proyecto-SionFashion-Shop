import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductoPage = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [idSubCategoria, setIdSubCategoria] = useState('');
    const [idProveedor, setIdProveedor] = useState('');
    const [idTienda, setIdTienda] = useState('');
    const [idFactura, setIdFactura] = useState('');
    const [editando, setEditando] = useState(false);
    const [productoId, setProductoId] = useState(null);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const response = await axios.get('/api/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const crearProducto = async () => {
        try {
            const nuevoProducto = {
                nombre,
                precio: parseFloat(precio),
                id_sub_categoria: idSubCategoria,
                id_proveedor: idProveedor,
                id_tienda: idTienda,
                id_factura: idFactura,
            };
            await axios.post('/api/productos', nuevoProducto);
            obtenerProductos();
            limpiarFormulario();
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    const actualizarProducto = async () => {
        try {
            const productoActualizado = {
                nombre,
                precio: parseFloat(precio),
                id_sub_categoria: idSubCategoria,
                id_proveedor: idProveedor,
                id_tienda: idTienda,
                id_factura: idFactura,
            };
            await axios.put(`/api/productos/${productoId}`, productoActualizado);
            obtenerProductos();
            limpiarFormulario();
            setEditando(false);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.delete(`/api/productos/${id}`);
            obtenerProductos();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const editarProducto = (producto) => {
        setNombre(producto.nombre);
        setPrecio(producto.precio.$numberDecimal);
        setIdSubCategoria(producto.id_sub_categoria);
        setIdProveedor(producto.id_proveedor);
        setIdTienda(producto.id_tienda);
        setIdFactura(producto.id_factura);
        setProductoId(producto._id);
        setEditando(true);
    };

    const limpiarFormulario = () => {
        setNombre('');
        setPrecio('');
        setIdSubCategoria('');
        setIdProveedor('');
        setIdTienda('');
        setIdFactura('');
        setProductoId(null);
    };

    return (
        <div>
            <h1>Gestión de Productos</h1>

            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio del producto"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ID Sub Categoría"
                    value={idSubCategoria}
                    onChange={(e) => setIdSubCategoria(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ID Proveedor"
                    value={idProveedor}
                    onChange={(e) => setIdProveedor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ID Tienda"
                    value={idTienda}
                    onChange={(e) => setIdTienda(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="ID Factura"
                    value={idFactura}
                    onChange={(e) => setIdFactura(e.target.value)}
                />

                <button onClick={editando ? actualizarProducto : crearProducto}>
                    {editando ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
                {editando && <button onClick={limpiarFormulario}>Cancelar</button>}
            </form>

            <ul>
                {productos.map((producto) => (
                    <li key={producto._id}>
                        <p>Nombre: {producto.nombre}</p>
                        <p>Precio: {producto.precio.$numberDecimal}</p>
                        <button onClick={() => editarProducto(producto)}>Editar</button>
                        <button onClick={() => eliminarProducto(producto._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductoPage;
