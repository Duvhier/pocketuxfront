import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/home.css'; 
import homeVideo from '../img/home.mp4'; 

function Home() {
    const [error, setError] = useState(false); // Si 'error' es un estado booleano
    const navigate = useNavigate(); // Hook para redirigir a otra página

    // Lógica para redirigir a la pantalla de login
    const handleSubmit = () => {
        navigate('/login'); // Redirigir a la ruta de login
    };

    // Lógica para el botón de registro
    const handleRegisterClick = () => {
        navigate('/registro'); // Redirigir a la ruta de registro
    };

    // Función para cerrar el modal
    const closeModal = () => setError(false);

    return (
        <div className="home-container">
            <video className="background-video" src={homeVideo} autoPlay loop muted />
            <div className="form-container">
                <h2 className="form-title">Gana Como Loco</h2>
                <p className="promo-text">
                    ¡Participa en la promo de Frito Lay® y Pepsi®, en donde podrás ganar dinero como loco! 🤩🤑
                </p>
                <button 
                    type="button" 
                    className="submit-button" 
                    onClick={handleSubmit} // Llama a la función para redirigir a login
                >
                    Ingresar
                </button>
                <label htmlFor="register" className="form-label">¿No tienes cuenta? Regístrate</label>
                <button 
                    type="button" 
                    className="submit-button" 
                    onClick={handleRegisterClick} // Llama a la función para redirigir a registro
                >
                    Registrarse
                </button>

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

export default Home;
