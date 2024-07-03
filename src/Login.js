import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css'; // Usar los mismos estilos que App

Modal.setAppElement('#root');

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password });

    try {
      const response = await fetch('https://pocketuxback.vercel.app/api/login', {
      //const response = await fetch('http://localhost:4000/api/login', {
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
        onLoginSuccess();
      } else {
        setError('Error in credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error in credentials');
    }
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="ai-agent-form">
        <h2 className="form-title">Pocket UX</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
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
    </div>
  );
}

export default Login;
