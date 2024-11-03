import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Registro from './components/Registro';
import Registrodos from './components/Registrodos';
import VistaUsuario from './components/VistaUsuario';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Login from './components/Login';

function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<App onLogout={handleLogout} />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/registro" element={<Registro />} /> 
              <Route path="/registrodos" element={<Registrodos />} />
              <Route path="/vistausuario" element={<VistaUsuario />} />
              
            </>
          )}
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

reportWebVitals(); 