import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/Login/LoginPage';
import Navbar from './components/navbar/Navbar'; // Asegúrate de tener un Navbar si es necesario
import AlertasStockPage from './pages/alertasStock/alertasstockPage';
import UsuariosPage from './pages/usuario/usuarioPage';
import Inventario from './pages/inventario/inventarioPage';
import ProductoPage from './pages/producto/productoPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* Si tienes un componente de navegación */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/alertasstock" element={<AlertasStockPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/productos" element={<ProductoPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
