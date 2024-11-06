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
    const [error, setError] =  useState(null);

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
        <div>
            <h1>Gestión de Categorías</h1>

            {/* Formulario para crear o editar categoría */}
            <form onSubmit={handleCrearCategoria}>
                <div>
                    <label>Nombre de la Categoría:</label>
                    <input 
                        type="text" 
                        value={nombreCategoria} 
                        onChange={(e) => setNombreCategoria(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Subcategorías (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={subCategoria.join(',')} 
                        onChange={(e) => setSubCategoria(e.target.value.split(',').map(id => id.trim()))}
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Categoría' : 'Crear Categoría'}</button>
            </form>

            {/* Lista de categorías */}
            <h2>Lista de Categorías</h2>
            {categorias.length > 0 ? (
                <ul>
                    {categorias.map(categoria => (
                        <li key={categoria._id}>
                            <strong>Nombre:</strong> {categoria.nombre_categoria} |
                            <strong> Subcategorías:</strong> {categoria.sub_categoria.join(', ') || 'Sin subcategorías'}
                            <button onClick={() => handleEditarCategoria(categoria)}>Editar</button>
                            <button onClick={() => handleEliminarCategoria(categoria._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay categorías disponibles</p>
            )}
        </div>
    );
};

export default CategoriasPage;
