import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';

const departamentos = {
    "Amazonas": ["Leticia", "Puerto Nariño"],
    "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Turbo", "Rionegro"],
    "Arauca": ["Arauca", "Arauquita", "Saravena", "Tame"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Baranoa"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar"],
    "Boyacá": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Puerto Boyacá"],
    "Caldas": ["Manizales", "La Dorada", "Chinchiná", "Villamaría"],
    "Caquetá": ["Florencia", "San Vicente del Caguán", "Belén de los Andaquíes"],
    "Casanare": ["Yopal", "Aguazul", "Villanueva", "Monterrey"],
    "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "El Bordo"],
    "Cesar": ["Valledupar", "Aguachica", "Bosconia", "Curumaní", "La Jagua de Ibirico"],
    "Chocó": ["Quibdó", "Istmina", "Condoto", "Tadó"],
    "Córdoba": ["Montería", "Lorica", "Sahagún", "Cereté", "Montelíbano"],
    "Cundinamarca": ["Bogotá", "Soacha", "Chía", "Zipaquirá", "Fusagasugá", "Girardot", "Facatativá"],
    "Guainía": ["Inírida"],
    "Guaviare": ["San José del Guaviare", "Calamar", "El Retorno"],
    "Huila": ["Neiva", "Pitalito", "Garzón", "La Plata"],
    "La Guajira": ["Riohacha", "Maicao", "Uribia", "San Juan del Cesar"],
    "Magdalena": ["Santa Marta", "Ciénaga", "Fundación", "Plato"],
    "Meta": ["Villavicencio", "Acacías", "Granada", "San Martín"],
    "Nariño": ["Pasto", "Tumaco", "Ipiales", "Túquerres"],
    "Norte de Santander": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario"],
    "Putumayo": ["Mocoa", "Puerto Asís", "Orito", "Sibundoy"],
    "Quindío": ["Armenia", "Calarcá", "La Tebaida", "Montenegro"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia"],
    "San Andrés y Providencia": ["San Andrés", "Providencia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
    "Sucre": ["Sincelejo", "Corozal", "Sampués", "Tolú"],
    "Tolima": ["Ibagué", "Espinal", "Melgar", "Honda"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Buga", "Cartago"],
    "Vaupés": ["Mitú"],
    "Vichada": ["Puerto Carreño", "La Primavera"],
  };

const Registrodos = () => {
  const [formData, setFormData] = useState({
    numeroCelular: '',
    departamento: '',
    ciudad: '',
    contraseña: ''
  });

  const [ciudades, setCiudades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('registroFormData'));
    if (savedData) {
      setFormData((prev) => ({ ...prev, ...savedData }));
    }
  }, []);

  useEffect(() => {
    if (formData.departamento) {
      setCiudades(departamentos[formData.departamento] || []);
      setFormData((prev) => ({ ...prev, ciudad: '' }));
    }
  }, [formData.departamento]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.success) {
      alert('Registro exitoso');
      localStorage.removeItem('registroFormData'); // Limpiar localStorage
      navigate('/vistausuario'); 
    } else {
      alert('Usuario ya existe');
    }
  };

  const handleRegresar = () => {
    navigate('/registro'); 
  };

  return (
    <div className="form-container-two">
      <button onClick={handleRegresar} className='exit-button'>Regresar</button>
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Registro - Parte 2</h2>

        <div className="form-group">
          <label htmlFor="numeroCelular">📱 Número de celular</label>
          <input
            type="tel"
            id="numeroCelular"
            name="numeroCelular"
            placeholder="Ejemplo: 3001234567"
            value={formData.numeroCelular}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="departamento">🌎 Departamento</label>
          <select
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un departamento</option>
            {Object.keys(departamentos).map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">📍 Ciudad</label>
          <select
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
            disabled={!formData.departamento}
          >
            <option value="">Selecciona una ciudad</option>
            {ciudades.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">🔐 Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            placeholder="Crea una contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Registrar</button>
      </form>
    </div>
  );
};

export default Registrodos;
