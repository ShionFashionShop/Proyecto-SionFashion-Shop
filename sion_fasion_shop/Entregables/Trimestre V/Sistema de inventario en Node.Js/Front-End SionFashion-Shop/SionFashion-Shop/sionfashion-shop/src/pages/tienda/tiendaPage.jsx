import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TiendaPage = () => {
    const [tiendas, setTiendas] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [formData, setFormData] = useState({
        nombre_tienda: '',
        telefono_tienda: '',
        ubicacion_tienda: '',
        id_ciudad: '',
        id_empresa: ''
    });
    const [editingId, setEditingId] = useState(null);

    // Función para obtener todas las tiendas
    const obtenerTiendas = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/tiendas');
            setTiendas(response.data);
        } catch (error) {
            console.error('Error al obtener las tiendas:', error);
        }
    };

    // Funciones para obtener ciudades y empresas
    const obtenerCiudades = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/ciudades');
            setCiudades(response.data);
        } catch (error) {
            console.error('Error al obtener las ciudades:', error);
        }
    };

    const obtenerEmpresas = async () => {
        try {
            const response = await axios.get('https://localhost:3000/api/empresas');
            setEmpresas(response.data);
        } catch (error) {
            console.error('Error al obtener las empresas:', error);
        }
    };

    // Manejar el cambio en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Función para crear o actualizar una tienda
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Actualizar tienda existente
                await axios.put(`https://localhost:3000/api/tiendas/${editingId}`, formData);
            } else {
                // Crear nueva tienda
                await axios.post('https://localhost:3000/api/tiendas', formData);
            }
            setFormData({
                nombre_tienda: '',
                telefono_tienda: '',
                ubicacion_tienda: '',
                id_ciudad: '',
                id_empresa: ''
            });
            setEditingId(null);
            obtenerTiendas();
        } catch (error) {
            console.error('Error al guardar la tienda:', error);
        }
    };

    // Función para editar una tienda
    const handleEdit = (tienda) => {
        setFormData({
            nombre_tienda: tienda.nombre_tienda,
            telefono_tienda: tienda.telefono_tienda,
            ubicacion_tienda: tienda.ubicacion_tienda,
            id_ciudad: tienda.id_ciudad,
            id_empresa: tienda.id_empresa
        });
        setEditingId(tienda._id);
    };

    // Función para eliminar una tienda
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:3000/api/tiendas/${id}`);
            obtenerTiendas();
        } catch (error) {
            console.error('Error al eliminar la tienda:', error);
        }
    };

    // Cargar tiendas, ciudades y empresas al montar el componente
    useEffect(() => {
        obtenerTiendas();
        obtenerCiudades();
        obtenerEmpresas();
    }, []);

    return (
        <div className="formulario p-3">
            <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                <h1 className="title">Tienda</h1>
            </div>
            <div className=" w-100 d-flex justify-content-star p-2">
                <form onSubmit={handleSubmit} className="col-sm-2 col-sm-2 col-md-2 col-lg-2 p-2">
                    <button className="btn btn-success" type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
                    <label className="w-100">Nombre de la tienda</label>
                    <input className="w-100"
                        type="text"
                        name="nombre_tienda"
                        placeholder="Nombre de la tienda"
                        value={formData.nombre_tienda}
                        onChange={handleChange}
                        required
                    />
                    <label className="w-100">Teléfono de la tienda</label>
                    <input className="w-100"
                        type="text"
                        name="telefono_tienda"
                        placeholder="Teléfono de la tienda"
                        value={formData.telefono_tienda}
                        onChange={handleChange}
                    />
                    <label className="w-100">Ubicación de la tienda</label>
                    <input className="w-100"
                        type="text"
                        name="ubicacion_tienda"
                        placeholder="Ubicación de la tienda"
                        value={formData.ubicacion_tienda}
                        onChange={handleChange}
                    />
                    <label className="w-100">Ciudad</label>
                    <select className="w-100"
                        name="id_ciudad"
                        value={formData.id_ciudad}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una ciudad</option>
                        {ciudades.map((ciudad) => (
                            <option key={ciudad._id} value={ciudad._id}>
                                {ciudad.nombre_ciudad}
                            </option>
                        ))}
                    </select>
                    <label className="w-100">Empresa</label>
                    <select className="w-100"
                        name="id_empresa"
                        value={formData.id_empresa}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una empresa</option>
                        {empresas.map((empresa) => (
                            <option key={empresa._id} value={empresa._id}>
                                {empresa.nombre_empresa}
                            </option>
                        ))}
                    </select>
                </form>
                <div className="contenedores p-3 col-sm-10 col-sm-10 col-md-10 col-lg-10">
                    {/* Lista de alertas */}
                    <div className="tituloForm d-flex align-items-center col-sm-12 col-sm-12 col-md-12 col-lg-12">
                        <h1 className="title">Lista de Tiendas</h1>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Ubicación</th>
                                <th>Ciudad</th>
                                <th>Empresa</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiendas.map((tienda) => (
                                <tr key={tienda._id}>
                                    <td>{tienda.nombre_tienda}</td>
                                    <td>{tienda.telefono_tienda}</td>
                                    <td>{tienda.ubicacion_tienda}</td>
                                    <td>{ciudades.find((ciudad) => ciudad._id === tienda.id_ciudad)?.nombre_ciudad}</td>
                                    <td>{empresas.find((empresa) => empresa._id === tienda.id_empresa)?.nombre_empresa}</td>
                                    <td>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleEdit(tienda)}>Editar</button>
                                        <button className="btn btn-outline-info m-1" onClick={() => handleDelete(tienda._id)}>Eliminar</button>
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
export default TiendaPage;
