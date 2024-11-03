import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';

const VistaUsuario = ({ email }) => {
  const [codigo, setCodigo] = useState('');
  const [codigosRegistrados, setCodigosRegistrados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Obtener los códigos registrados del usuario al montar el componente
    if (email) {
      axios.get(`/api/codigos/${email}`)
        .then(response => {
          setCodigosRegistrados(response.data); // Los códigos obtenidos de la colección 'premios'
        })
        .catch(error => {
          console.error('Error al obtener los códigos:', error);
          setMensaje('No se pudieron cargar los códigos registrados');
        });
    }
  }, [email]);

  const registrarCodigo = async () => {
    const codigoInt = parseInt(codigo, 10);

    // Validar que el código esté en el rango adecuado
    if (isNaN(codigoInt) || codigoInt < 0 || codigoInt > 999) {
      setMensaje('Por favor, ingresa un código entre 000 y 999');
      return;
    }

    try {
      const response = await axios.post('/api/codigos', { codigo: codigoInt, email });
      setMensaje(response.data.mensaje); // Mostrar mensaje del servidor

      // Si el código se registró exitosamente, actualizar la lista de códigos registrados
      if (response.data.codigo) {
        setCodigosRegistrados([...codigosRegistrados, response.data.codigo]);
      }
      setCodigo(''); // Limpiar el campo de entrada
    } catch (error) {
      setMensaje('Error al registrar el código');
      console.error('Error al registrar el código:', error);
    }
  };

  return (
    <div className="vista-usuario-container form-container">
      <h1 className="form-title">Registro de Códigos</h1>
      <div className="form-group">
        <label className="form-label">Ingresa un código (000-999):</label>
        <input 
          type="number" 
          value={codigo} 
          onChange={(e) => setCodigo(e.target.value)} 
          min="0" 
          max="999" 
          className="form-group-input"
          placeholder="000-999"
        />
        <button onClick={registrarCodigo} className="submit-button">Registrar</button>
      </div>
      <p className="promo-text">{mensaje}</p>

      <h2 className="form-title">Códigos Registrados</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>Código</th>
            <th>Estado</th>
            <th>Premio</th>
            <th>Fecha de Ingreso</th>
          </tr>
        </thead>
        <tbody>
          {codigosRegistrados.map((codigoItem, index) => (
            <tr key={index}>
              <td>{codigoItem.codigo}</td>
              <td>{codigoItem.estado}</td>
              <td>{codigoItem.premio || 'Sin premio'}</td>
              <td>{new Date(codigoItem.fechaIngreso).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VistaUsuario;
