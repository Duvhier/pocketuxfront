import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Registro';
import Registrodos from './components/Registrodos';
import Home from './components/Home'; 
import './styles/App.css';
import VistaUsuario from './components/VistaUsuario';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={() => console.log("Login exitoso")} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/registrodos" element={<Registrodos />} />
          <Route path="/vistausuario" element={<VistaUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;