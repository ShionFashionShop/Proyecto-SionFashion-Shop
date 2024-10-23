import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/Login/LoginPage';
import Navbar from './components/navbar/Navbar'; // Asegúrate de tener un Navbar si es necesario

function App() {
  return (
    <Router>
      <Navbar /> {/* Si tienes un componente de navegación */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
