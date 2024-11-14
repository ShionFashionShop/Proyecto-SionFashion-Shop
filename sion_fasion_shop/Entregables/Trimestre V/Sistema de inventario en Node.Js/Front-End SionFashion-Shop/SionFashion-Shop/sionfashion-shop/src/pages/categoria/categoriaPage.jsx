import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:3000/api/categorias';

const CategoriasPage = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState([]); // Maneja la lista de IDs de subcategorías
    const [modoEdicion, setModoEdicion] = useState(false);
    const [categoriaActual, setCategoriaActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todas las categorías al cargar el componente
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(API_URL);
                setCategorias(response.data);
            } catch (err) {
                console.error('Error al obtener las categorías', err);
                setError('Error al obtener las categorías. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategorias();
    }, []);

    // Manejar la creación o edición de una categoría
    const handleCrearCategoria = async (e) => {
        e.preventDefault();

        const nuevaCategoria = {
            nombre_categoria: nombreCategoria,
            sub_categoria: subCategoria,
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${categoriaActual._id}`, nuevaCategoria);
                setCategorias(categorias.map(categoria =>
                    categoria._id === categoriaActual._id ? { ...categoriaActual, ...nuevaCategoria } : categoria
                ));
                setModoEdicion(false);
                setCategoriaActual(null);
            } else {
                const response = await axios.post(API_URL, nuevaCategoria);
                setCategorias([...categorias, response.data]);
            }

            // Limpiar formulario después de enviar
            setNombreCategoria('');
            setSubCategoria([]);
        } catch (err) {
            console.error('Error al guardar la categoría', err);
            setError('Error al guardar la categoría.');
        }
    };

    // Manejar la edición de una categoría
    const handleEditarCategoria = (categoria) => {
        setModoEdicion(true);
        setCategoriaActual(categoria);
        setNombreCategoria(categoria.nombre_categoria);
        setSubCategoria(categoria.sub_categoria || []); // Cargar lista de subcategorías
    };

    // Manejar la eliminación de una categoría
    const handleEliminarCategoria = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setCategorias(categorias.filter(categoria => categoria._id !== id));
        } catch (err) {
            console.error('Error al eliminar la categoría', err);
            setError('Error al eliminar la categoría.');
        }
    };

    // Mostrar cargando mientras se obtienen las categorías
    if (loading) {
        return <div>Cargando categorías...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1>Gestión de Categorías</h1>
            </div>
            <div className="w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleCrearCategoria} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{modoEdicion ? 'Actualizar Categoría' : 'Crear Categoría'}</button>
                    <label className="w-100">Nombre de la Categoría:</label>
                    <input className="w-100" type="text" value={nombreCategoria} onChange={(e) => setNombreCategoria(e.target.value)} required />
                    <label className="w-100">Subcategorías (IDs separados por coma):</label>
                    <input className="w-100" type="text" value={subCategoria.join(',')} onChange={(e) => setSubCategoria(e.target.value.split(',').map(id => id.trim()))} />
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Usuarios</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Subcategorías</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map((categoria) => (
                                <tr key={categoria._id}>
                                    <td>{categoria.nombre_categoria}</td>
                                    <td> {categoria.sub_categoria.join(', ') || 'Sin subcategorías'}</td>
                                    <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEditarCategoria(categoria)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEliminarCategoria(categoria._id)}>Eliminar</button>
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


export default CategoriasPage;