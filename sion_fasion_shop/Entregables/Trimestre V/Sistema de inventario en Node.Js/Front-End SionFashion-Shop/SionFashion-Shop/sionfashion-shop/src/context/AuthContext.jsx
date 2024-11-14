import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    // Función para iniciar sesión, guardando el rol en el contexto
    const login = (roles) => {
        setIsAuthenticated(true);
        setUserRole(roles.includes('Administrador') ? 'Administrador' : roles[0]);
    };

    // Función para cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = JSON.parse(localStorage.getItem('role'));

        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role.includes('Administrador') ? 'Administrador' : role[0]);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
