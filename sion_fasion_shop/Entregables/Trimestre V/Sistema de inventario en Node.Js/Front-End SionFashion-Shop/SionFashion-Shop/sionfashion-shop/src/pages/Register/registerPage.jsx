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
        <div className="login-page">
            <h2>Registro de Usuario</h2>

            {mensaje && (
                <p className={`mensaje ${error ? 'error-text' : 'exito-text'}`}>
                    {mensaje}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Introduce tu nombre de usuario"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Introduce tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Introduce tu contraseña"
                        value={claveUsuario}
                        onChange={(e) => setClaveUsuario(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default RegistroPage;
