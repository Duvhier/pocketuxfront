import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function App({ onLogout }) {
  const [formData, setFormData] = useState({
    clientName: '',
    agentType: '',
    useCase: '',
    keyClientInfo: '',
    additionalInfo: ''
  });
  const [success, setSuccess] = useState(false);

  const agentTypes = ['Voice', 'WP', 'IG', 'FB', 'LinkedIn'];
  const useCases = ['Medical Assistant', 'Cobranzas'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    const dataToSend = {
      user,
      role,
      ...formData
    };

    console.log('Formulario a enviar: ', dataToSend);

    try {
      const response = await fetch('https://pocketuxback.vercel.app/api/demo', {
      //const response = await fetch('http://localhost:4000/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        console.log('Success:', response);
        setSuccess(true);
        setFormData({
          clientName: '',
          agentType: '',
          useCase: '',
          keyClientInfo: '',
          additionalInfo: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setSuccess(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  };

  const renderAdditionalField = () => {
    switch (formData.agentType) {
      case 'Voice':
      case 'WP':
        return (
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>
        );
      case 'IG':
        return (
          <div className="form-group">
            <label htmlFor="instagramUser">Instagram User</label>
            <input
              type="text"
              id="instagramUser"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>
        );
      case 'FB':
      case 'LinkedIn':
        return (
          <div className="form-group">
            <label htmlFor="profileUrl">Profile URL</label>
            <input
              type="text"
              id="profileUrl"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit} className="ai-agent-form">
        <h2 className="form-title">TIFFANY</h2>
        
        <div className="form-group">
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="agentType">Agent Type</label>
          <select
            id="agentType"
            name="agentType"
            value={formData.agentType}
            onChange={handleChange}
          >
            <option value="">Select Agent Type</option>
            {agentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="useCase">Use Case</label>
          <select
            id="useCase"
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
          >
            <option value="">Select Use Case</option>
            {useCases.map((useCase) => (
              <option key={useCase} value={useCase}>{useCase}</option>
            ))}
          </select>
        </div>

        {renderAdditionalField()}

        <div className="form-group">
          <label htmlFor="keyClientInfo">Key Client Information</label>
          <textarea
            id="keyClientInfo"
            name="keyClientInfo"
            value={formData.keyClientInfo}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Start Demo
        </button>
      </form>

      <Modal
        isOpen={success}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Success</h2>
          <p>DEMO submitted successfully!</p>
          <button onClick={closeModal} className="submit-button">Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
