import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/Login/LoginPage';
import Navbar from './components/navbar/Navbar'; // Asegúrate de tener un Navbar si es necesario
import AlertasStockPage from './pages/alertasStock/alertasstockPage';
import UsuariosPage from './pages/usuario/usuarioPage';
import Inventario from './pages/inventario/inventarioPage';
import ProductoPage from './pages/producto/productoPage';
import EmpresasPage from './pages/empresa/empresaPage.jsx';
import FacturasPage from './pages/factura/facturaPage.jsx';
import ClientesPage from './pages/cliente/clientePage.jsx';
import EmpleadoPage from './pages/empleado/empleadoPage.jsx';
import RolesPage from './pages/roles/rolesPage.jsx';
import ProveedoresPage from './pages/proveedor/proveedorPage.jsx';
import CategoriasPage from './pages/categoria/categoriaPage.jsx';
import Historial_inventarioPage from './pages/historial_inventario/historial_inventarioPage.jsx';
import TiendaPage from './pages/tienda/tiendaPage.jsx';

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
          <Route path="/empresas" element={<EmpresasPage />} />
          <Route path="/facturas" element={<FacturasPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/empleados" element={<EmpleadoPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/historial-inventario" element={<Historial_inventarioPage />} />   
          <Route path="/tiendas" element={<TiendaPage />} />   

        </Routes>
      </div>
    </Router>
  );
}

export default App;
