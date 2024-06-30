import React, { useState } from 'react';
import './App.css';

function AIAgentDemoForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    agentType: '',
    useCase: '',
    keyClientInfo: '',
    additionalInfo: ''
  });

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
    console.log('Form submitted:', formData);
    
    try {
        const response = await fetch('https://pocketuxback.vercel.app/api/demo', {
        //const response = await fetch('http://localhost:4000/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
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
      <form onSubmit={handleSubmit} className="ai-agent-form">
        <h2>AI Agent Demo</h2>
        
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
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AIAgentDemoForm />
    </div>
  );
}

export default App;
