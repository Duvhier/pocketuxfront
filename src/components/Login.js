import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; 
import '../styles/home.css';
import videoSource from '../img/videoplayback.mp4';

Modal.setAppElement('#root');

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.status === "Bienvenido") {
        console.log(`User: ${result.user}, Role: ${result.role}`);
        localStorage.setItem('user', result.user);
        localStorage.setItem('role', result.role);
        console.log("ruta de vistausuario")
        onLoginSuccess();
        navigate("/vistausuario");
      } else {
        setError('Error en las credenciales');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error en las credenciales');
    }
  };

  const handleRegisterClick = () => {
    navigate('/registro');
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <div className="home-container-login">
      <div className="video-background">
        <video 
          autoPlay 
          muted 
          loop 
          className="background-video"
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="form-container">
        <form onSubmit={handleSubmit} className="ai-agent-form">
          <h2 className="form-title">Gana Como Loco</h2>
          <p className="promo-text">
            ¡Participa en la promo de Frito Lay® y Pepsi®, en donde podrías ganar dinero como loco! 🤩🤑
          </p>
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
          type="submit" className="submit-button">Ingresar</button>
          <label htmlFor="registro">¿No tienes cuenta? Regístrate</label>
          <button 
            type="button" 
            className="submit-button" 
            onClick={handleRegisterClick} 
          >
            Registrarse
          </button>
        </form>
  
        <Modal
          isOpen={!!error}
          onRequestClose={closeModal}
          contentLabel="Error Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={closeModal} className="submit-button">Cerrar</button>
          </div>
        </Modal>
        
        <div className="logos-container">
          <img src={require('../img/margaritalogo.png')} alt="Margarita Logo" className="logo" />
          <img src={require('../img/doritoslogo.png')} alt="Doritos Logo" className="logo" />
          <img src={require('../img/detoditologo.png')} alt="De Todo Logo" className="logo" />
        </div>
      </div>
    </div>
  );  
}

export default Login;
