import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:3000/api/empresas';

const EmpresasPage = () => {
    const [empresas, setEmpresas] = useState([]);
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [direccionEmpresa, setDireccionEmpresa] = useState('');
    const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
    const [emailEmpresa, setEmailEmpresa] = useState('');  // Nuevo campo para email
    const [tienda, setTienda] = useState([]); // Nuevo campo para tienda (lista de IDs)
    const [modoEdicion, setModoEdicion] = useState(false);
    const [empresaActual, setEmpresaActual] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener todas las empresas al cargar el componente
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const response = await axios.get(API_URL);
                setEmpresas(response.data);
            } catch (err) {
                console.error('Error al obtener las empresas', err);
                setError('Error al obtener las empresas. Verifica la API.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmpresas();
    }, []);

    // Manejar la creación o edición de una empresa
    const handleCrearEmpresa = async (e) => {
        e.preventDefault();

        const nuevaEmpresa = {
            nombre_empresa: nombreEmpresa,
            direccion_empresa: direccionEmpresa,
            telefono_empresa: telefonoEmpresa,
            email_empresa: emailEmpresa,
            tienda: tienda,
        };

        try {
            if (modoEdicion) {
                await axios.put(`${API_URL}/${empresaActual._id}`, nuevaEmpresa);
                setEmpresas(empresas.map(empresa => 
                    empresa._id === empresaActual._id ? { ...empresaActual, ...nuevaEmpresa } : empresa
                ));
                setModoEdicion(false);
                setEmpresaActual(null);
            } else {
                const response = await axios.post(API_URL, nuevaEmpresa);
                setEmpresas([...empresas, response.data]);
            }

            // Limpiar formulario después de enviar
            setNombreEmpresa('');
            setDireccionEmpresa('');
            setTelefonoEmpresa('');
            setEmailEmpresa('');
            setTienda([]);
        } catch (err) {
            console.error('Error al guardar la empresa', err);
            setError('Error al guardar la empresa.');
        }
    };

    // Manejar la edición de una empresa
    const handleEditarEmpresa = (empresa) => {
        setModoEdicion(true);
        setEmpresaActual(empresa);
        setNombreEmpresa(empresa.nombre_empresa);
        setDireccionEmpresa(empresa.direccion_empresa);
        setTelefonoEmpresa(empresa.telefono_empresa);
        setEmailEmpresa(empresa.email_empresa);  // Nuevo campo de email
        setTienda(empresa.tienda || []); // Cargar lista de tiendas
    };

    // Manejar la eliminación de una empresa
    const handleEliminarEmpresa = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setEmpresas(empresas.filter(empresa => empresa._id !== id));
        } catch (err) {
            console.error('Error al eliminar la empresa', err);
            setError('Error al eliminar la empresa.');
        }
    };

    // Mostrar cargando mientras se obtienen las empresas
    if (loading) {
        return <div>Cargando empresas...</div>;
    }

    // Mostrar mensaje de error si falla la carga
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Gestión de Empresas</h1>

            {/* Formulario para crear o editar empresa */}
            <form onSubmit={handleCrearEmpresa}>
                <div>
                    <label>Nombre de la Empresa:</label>
                    <input 
                        type="text" 
                        value={nombreEmpresa} 
                        onChange={(e) => setNombreEmpresa(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Dirección de la Empresa:</label>
                    <input 
                        type="text" 
                        value={direccionEmpresa} 
                        onChange={(e) => setDireccionEmpresa(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Teléfono de la Empresa:</label>
                    <input 
                        type="text" 
                        value={telefonoEmpresa} 
                        onChange={(e) => setTelefonoEmpresa(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email de la Empresa:</label>
                    <input 
                        type="email" 
                        value={emailEmpresa} 
                        onChange={(e) => setEmailEmpresa(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label>Tienda (IDs separados por coma):</label>
                    <input 
                        type="text" 
                        value={tienda.join(',')} 
                        onChange={(e) => setTienda(e.target.value.split(','))}
                    />
                </div>
                <button type="submit">{modoEdicion ? 'Actualizar Empresa' : 'Crear Empresa'}</button>
            </form>

            {/* Lista de empresas */}
            <h2>Lista de Empresas</h2>
            {empresas.length > 0 ? (
                <ul>
                    {empresas.map(empresa => (
                        <li key={empresa._id}>
                            <strong>Nombre:</strong> {empresa.nombre_empresa} | 
                            <strong> Dirección:</strong> {empresa.direccion_empresa} | 
                            <strong> Teléfono:</strong> {empresa.telefono_empresa || 'N/A'} |
                            <strong> Email:</strong> {empresa.email_empresa || 'N/A'} |
                            <strong> Tienda:</strong> {empresa.tienda?.join(', ') || 'Sin tiendas'}
                            <button onClick={() => handleEditarEmpresa(empresa)}>Editar</button>
                            <button onClick={() => handleEliminarEmpresa(empresa._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay empresas disponibles</p>
            )}
        </div>
    );  
};

export default EmpresasPage;
