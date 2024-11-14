import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [clave_usuario, setClaveUsuario] = useState(''); // Cambié 'password' a 'clave_usuario'
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Realiza la solicitud al backend para autenticar al usuario
            const response = await axios.post('https://localhost:3000/api/login', { email, clave_usuario }); // Cambié 'password' a 'clave_usuario'

            // Si la autenticación es exitosa, redirige al usuario a otra página
            if (response.data.success) {
                // Guarda el token o información del usuario si es necesario
                localStorage.setItem('token', response.data.token);
                navigate('/home'); // Redirige a la página de inicio u otra ruta
            } else {
                setError('Credenciales inválidas'); // Cambié el mensaje de error
            }
        } catch (err) {
            setError('Error al iniciar sesión, por favor intenta de nuevo.');
            console.error(err);
        }
    };

    return (
        <div className="d-flex justify-content-center login2" >
        <div className="login-page">
            <h2>Iniciar Sesión</h2> {/* Cambié el texto del encabezado */}
            <form  onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label> {/* Cambié el texto de la etiqueta */}
                    <input
                        type="password"
                        className="form-control"
                        value={clave_usuario} // Cambié 'password' a 'clave_usuario'
                        onChange={(e) => setClaveUsuario(e.target.value)} // Cambié 'setPassword' a 'setClaveUsuario'
                        required
                    />
                </div>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="btn btn-primary">
                    Iniciar Sesión {/* Cambié el texto del botón */}
                </button>
            </form>
            </div>
        </div>
    );
};

export default Login;
