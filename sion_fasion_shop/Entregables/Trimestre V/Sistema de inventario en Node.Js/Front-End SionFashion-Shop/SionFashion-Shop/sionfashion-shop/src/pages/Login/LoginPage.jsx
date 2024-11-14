import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importa el contexto

const Login = () => {
    const [email, setEmail] = useState('');
    const [clave_usuario, setClaveUsuario] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Utiliza el contexto para manejar la autenticación

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Resetea el error

        try {
            // Realiza la solicitud al backend para autenticar al usuario
            const response = await axios.post('https://localhost:3000/api/login', { email, clave_usuario });

            // Verifica si la autenticación es exitosa
            if (response.data.success) {
                // Guarda el token en localStorage
                localStorage.setItem('token', response.data.token);

                // Verifica si el backend ha devuelto un rol
                const userRoles = response.data.roles; // Asegúrate de que el backend devuelve el rol del usuario
                if (userRoles && userRoles.length > 0) {
                    // Actualiza el contexto con el rol del usuario
                    login(userRoles);

                    // Guarda el rol también en el localStorage para persistir
                    localStorage.setItem('role', JSON.stringify(userRoles)); // Guarda los roles en formato JSON
                } else {
                    setError('No se ha recibido el rol del usuario.');
                }

                // Redirige a la página de inicio
                navigate('/home');
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            // Manejo de error si la solicitud falla
            setError('Error al iniciar sesión, por favor intenta de nuevo.');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
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
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={clave_usuario}
                        onChange={(e) => setClaveUsuario(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" className="btn btn-primary">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
