import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const ProductoPage = () => {
    const [productos, setProductos] = useState([]);
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [unidadMedida, setUnidadMedida] = useState('');
    const [pesoDelProducto, setPesoDelProducto] = useState('');
    const [ubicacionProducto, setUbicacionProducto] = useState('');
    const [idSubCategoria, setIdSubCategoria] = useState('');
    const [idProveedor, setIdProveedor] = useState('');
    const [idTienda, setIdTienda] = useState('');
    const [idFactura, setIdFactura] = useState('');
    const [editando, setEditando] = useState(false);
    const [productoId, setProductoId] = useState(null);
    const [productoDetalle, setProductoDetalle] = useState(null);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const crearProducto = async () => {
        try {
            const nuevoProducto = {
                nombre_producto: nombreProducto,
                descripcion_producto: descripcionProducto,
                precio_producto: parseFloat(precioProducto),
                unidad_medida: unidadMedida,
                peso_del_producto: pesoDelProducto,
                ubicacion_producto: ubicacionProducto,
                id_sub_categoria: idSubCategoria,
                id_proveedor: idProveedor,
                id_tienda: idTienda,
                id_factura: idFactura,
            };
            await axios.post('https://localhost:3000/api/productos', nuevoProducto);
            obtenerProductos();
            limpiarFormulario();
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    const actualizarProducto = async () => {
        try {
            const productoActualizado = {
                nombre_producto: nombreProducto,
                descripcion_producto: descripcionProducto,
                precio_producto: parseFloat(precioProducto),
                unidad_medida: unidadMedida,
                peso_del_producto: pesoDelProducto,
                ubicacion_producto: ubicacionProducto,
                id_sub_categoria: idSubCategoria,
                id_proveedor: idProveedor,
                id_tienda: idTienda,
                id_factura: idFactura,
            };
            await axios.put(`https://localhost:3000/api/productos/${productoId}`, productoActualizado);
            obtenerProductos();
            limpiarFormulario();
            setEditando(false);
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await axios.delete(`https://localhost:3000/api/productos/${id}`);
            obtenerProductos();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const editarProducto = (producto) => {
        setNombreProducto(producto.nombre_producto);
        setDescripcionProducto(producto.descripcion_producto);
        setPrecioProducto(producto.precio_producto.$numberDecimal);
        setUnidadMedida(producto.unidad_medida);
        setPesoDelProducto(producto.peso_del_producto);
        setUbicacionProducto(producto.ubicacion_producto);
        setIdSubCategoria(producto.id_sub_categoria);
        setIdProveedor(producto.id_proveedor);
        setIdTienda(producto.id_tienda);
        setIdFactura(producto.id_factura);
        setProductoId(producto._id);
        setEditando(true);
    };

    const mostrarDetalleProducto = (producto) => {
        setProductoDetalle(producto);
    };

    const limpiarFormulario = () => {
        setNombreProducto('');
        setDescripcionProducto('');
        setPrecioProducto('');
        setUnidadMedida('');
        setPesoDelProducto('');
        setUbicacionProducto('');
        setIdSubCategoria('');
        setIdProveedor('');
        setIdTienda('');
        setIdFactura('');
        setProductoId(null);
        setEditando(false);
        setProductoDetalle(null);
    };

    // Configuración de columnas para react-data-table-component
    const columnas = [
        { name: 'Nombre', selector: (row) => row.nombre_producto, sortable: true },
        { name: 'Descripción', selector: (row) => row.descripcion_producto },
        { name: 'Precio', selector: (row) => `$${row.precio_producto.$numberDecimal}`, sortable: true },
        {
            name: 'Acciones',
            cell: (row) => (
                <>
                    <button onClick={() => editarProducto(row)}>Editar</button>
                    <button onClick={() => eliminarProducto(row._id)}>Eliminar</button>
                    <button onClick={() => mostrarDetalleProducto(row)}>Detalle</button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h1>Gestión de Productos</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Nombre" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} required />
                <input type="text" placeholder="Descripción" value={descripcionProducto} onChange={(e) => setDescripcionProducto(e.target.value)} />
                <input type="number" placeholder="Precio" value={precioProducto} onChange={(e) => setPrecioProducto(e.target.value)} required />
                <input type="text" placeholder="Unidad de medida" value={unidadMedida} onChange={(e) => setUnidadMedida(e.target.value)} />
                <input type="text" placeholder="Peso" value={pesoDelProducto} onChange={(e) => setPesoDelProducto(e.target.value)} />
                <input type="text" placeholder="Ubicación" value={ubicacionProducto} onChange={(e) => setUbicacionProducto(e.target.value)} />
                <input type="text" placeholder="ID Sub Categoría" value={idSubCategoria} onChange={(e) => setIdSubCategoria(e.target.value)} required />
                <input type="text" placeholder="ID Proveedor" value={idProveedor} onChange={(e) => setIdProveedor(e.target.value)} required />
                <input type="text" placeholder="ID Tienda" value={idTienda} onChange={(e) => setIdTienda(e.target.value)} required />
                <input type="text" placeholder="ID Factura" value={idFactura} onChange={(e) => setIdFactura(e.target.value)} />
                <button onClick={editando ? actualizarProducto : crearProducto}>{editando ? 'Actualizar' : 'Crear'}</button>
                {editando && <button onClick={limpiarFormulario}>Cancelar</button>}
            </form>

            {/* Tabla de productos con paginación */}
            <DataTable
                columns={columnas}
                data={productos}
                pagination
                paginationRowsPerPageOptions={[5, 10, 15]}
                paginationPerPage={5} // Muestra 5 productos por página
            />

            {/* Modal de detalles del producto */}
            {productoDetalle && (
                <div className="modal">
                    <h2>Detalles del Producto</h2>
                    <p><strong>Nombre:</strong> {productoDetalle.nombre_producto}</p>
                    <p><strong>Descripción:</strong> {productoDetalle.descripcion_producto}</p>
                    <p><strong>Precio:</strong> ${productoDetalle.precio_producto.$numberDecimal}</p>
                    <p><strong>Unidad de Medida:</strong> {productoDetalle.unidad_medida}</p>
                    <p><strong>Peso:</strong> {productoDetalle.peso_del_producto}</p>
                    <p><strong>Ubicación:</strong> {productoDetalle.ubicacion_producto}</p>
                    <p><strong>ID Sub Categoría:</strong> {productoDetalle.id_sub_categoria}</p>
                    <p><strong>ID Proveedor:</strong> {productoDetalle.id_proveedor}</p>
                    <p><strong>ID Tienda:</strong> {productoDetalle.id_tienda}</p>
                    <p><strong>ID Factura:</strong> {productoDetalle.id_factura}</p>
                    <button onClick={() => setProductoDetalle(null)}>Cerrar</button>
                </div>
            )}
        </div>
    );
};

export default ProductoPage;
