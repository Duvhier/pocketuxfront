// VistaAdmin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function VistaAdmin() {
    const [ganadores, setGanadores] = useState([]);
    const navigate = useNavigate();

    // Función para cargar los datos de los ganadores al iniciar la vista
    const fetchGanadores = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ganadores');
            const data = await response.json();
            setGanadores(data);
        } catch (error) {
            console.error("Error al cargar ganadores:", error);
        }
    };

    // Efecto para cargar los datos al renderizar el componente
    useEffect(() => {
        fetchGanadores();
    }, []);

    // Función para actualizar la lista de ganadores sin recargar la página
    const handleActualizar = () => {
        fetchGanadores();
    };

    // Función para salir y redirigir a Home
    const handleSalir = () => {
        navigate('/home');
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">Ganadores de la Promoción</h2>
            <table className="ganadores-table">
                <thead>
                    <tr>
                        <th>Fecha de Ingreso</th>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Celular</th>
                        <th>Código</th>
                        <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {ganadores.map((ganador, index) => (
                        <tr key={index}>
                            <td>{ganador.fechaIngreso}</td>
                            <td>{ganador.nombre}</td>
                            <td>{ganador.cedula}</td>
                            <td>{ganador.celular}</td>
                            <td>{ganador.codigo}</td>
                            <td>{ganador.premio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="admin-buttons">
                <button onClick={handleActualizar} className="update-button">Actualizar</button>
                <button onClick={handleSalir} className="exit-button">Salir</button>
            </div>
        </div>
    );
}

export default VistaAdmin;
