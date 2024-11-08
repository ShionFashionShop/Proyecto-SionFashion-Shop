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
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1 className="title">Gestión de Empresas</h1>
            </div>
            <div className=" w-100 d-flex justify-content-star p-2">
                {/* Formulario para crear o editar empresa */}
                <form onSubmit={handleCrearEmpresa} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{modoEdicion ? 'Actualizar Empresa' : 'Crear Empresa'}</button>


                    <label className="w-100">Nombre de la Empresa:</label>
                    <input className="w-100"
                        type="text"
                        value={nombreEmpresa}
                        onChange={(e) => setNombreEmpresa(e.target.value)}
                        required
                    />
                    <label className="w-100">Dirección de la Empresa:</label>
                    <input className="w-100"
                        type="text"
                        value={direccionEmpresa}
                        onChange={(e) => setDireccionEmpresa(e.target.value)}
                        required
                    />
                    <label className="w-100">Teléfono de la Empresa:</label>
                    <input className="w-100"
                        type="text"
                        value={telefonoEmpresa}
                        onChange={(e) => setTelefonoEmpresa(e.target.value)}
                    />
                    <label className="w-100">Email de la Empresa:</label>
                    <input className="w-100"
                        type="email"
                        value={emailEmpresa}
                        onChange={(e) => setEmailEmpresa(e.target.value)}
                        required
                    />
                    <label className="w-100">Tienda (IDs separados por coma):</label>
                    <input className="w-100"
                        type="text"
                        value={tienda.join(',')}
                        onChange={(e) => setTienda(e.target.value.split(','))}
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
                                <th >Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Tienda</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas.map(empresa => (
                                <tr key={empresa._id}>
                                    <td>{empresa.nombre_empresa}</td>
                                    <td>{empresa.direccion_empresa} </td>
                                    <td>{empresa.telefono_empresa || 'N/A'} </td>
                                    <td>{empresa.email_empresa || 'N/A'} </td>
                                    <td>{empresa.tienda?.join(', ') || 'Sin tiendas'}</td>
                                    <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEditarEmpresa(empresa)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEliminarEmpresa(empresa._id)}>Eliminar</button>
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

export default EmpresasPage;
