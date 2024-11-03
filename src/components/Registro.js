import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    fechaNacimiento: null,
    tipoDocumento: 'Cédula de Ciudadanía',
    numeroDocumento: '',
    correo: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, fechaNacimiento: date });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    // Guarda los datos en el localStorage para usarlos en el siguiente paso
    localStorage.setItem('registroFormData', JSON.stringify(formData));
    navigate('/registrodos'); // Redirige a la segunda parte del registro
  };

  const handleSalir = () => {
    navigate('/login');  // Navega al login
  };

  return (
    <div className="form-container-register">
      <button onClick={handleSalir} className='exit-button'>Salir</button>
      <form onSubmit={handleContinue} className="register-form">
        <h2 className="form-title">Registro - Parte 1</h2>

        <div className="form-group-register">
          <label htmlFor="nombre">📝 Nombre y Apellido:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ejemplo: Maria Ana Suarez"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group-register">
          <label htmlFor="fechaNacimiento">📝 Fecha de Nacimiento</label>
          <DatePicker
            selected={formData.fechaNacimiento}
            onChange={handleDateChange}
            dateFormat="dd MMM yyyy"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Selecciona tu fecha de nacimiento"
            required
          />
        </div>

        <div className="form-group-register">
          <label htmlFor="tipoDocumento">🪪 Tipo de documento</label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            required
          >
            <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
            <option value="Cédula de Extranjería">Cédula de Extranjería</option>
            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
          </select>
        </div>

        <div className="form-group-register">
          <label htmlFor="numeroDocumento">🔢 Número de documento</label>
          <input
            type="text"
            id="numeroDocumento"
            name="numeroDocumento"
            placeholder="Ingresa tu número de documento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group-register">
          <label htmlFor="correo">📧 Correo electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Ejemplo: usuario@email.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button-register">Continuar 👉</button>
      </form>
    </div>
  );
};

export default Registro;
