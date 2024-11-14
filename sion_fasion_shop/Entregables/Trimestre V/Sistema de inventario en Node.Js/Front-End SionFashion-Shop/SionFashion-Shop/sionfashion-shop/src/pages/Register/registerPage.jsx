import React, { useState } from 'react';
import axios from 'axios';

const RegistroPage = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [claveUsuario, setClaveUsuario] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { nombre_usuario: nombreUsuario, email, clave_usuario: claveUsuario };

        try {
            const response = await axios.post('https://localhost:3000/api/registro', newUser);
            setMensaje(response.data.msg);
            setError(false);
        } catch (err) {
            setMensaje(err.response.data.msg || 'Error al registrar');
            setError(true);
        }
    };

    return (


         <div className="d-flex justify-content-center login2" >
        <div className="login-page">
            <h2>Registro de Usuario</h2> {/* Cambié el texto del encabezado */}
            <form  onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="formNombreUsuario">Nombre de Usuario</label>
                        <input className="form-control"
                        type="text"
                        id="formNombreUsuario"
                        placeholder="Introduce tu nombre de usuario"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="formEmail">Email</label>
                        <input className="form-control"
                        type="email"
                        id="formEmail"
                        placeholder="Introduce tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                 <div className="form-group">
                   <label htmlFor="formClaveUsuario">Contraseña</label>
                        <input className="form-control"
                        type="password"
                        id="formClaveUsuario"
                        placeholder="Introduce tu contraseña"
                        value={claveUsuario}
                        onChange={(e) => setClaveUsuario(e.target.value)}
                        required
                    />
                </div>
                {mensaje && (
                <div className={`mensaje ${error ? 'error' : 'exito'}`}>
                    {mensaje}
                </div>
            )}
                    <button type="submit" className="btn btn-primary">
                    Registrar
                </button>
            </form>
            </div>
        </div>


      
    );
};

export default RegistroPage;
