import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Consumir el endpoint del backend al cargar la aplicación
  useEffect(() => {
    fetch('https://secure-medication.onrender.com/medicines')
      .then((response) => response.json())
      .then((data) => setMedicamentos(data))
      .catch((error) => console.error('Error al conectar con la API:', error));
  }, []);

  // Lógica de filtrado mediante coincidencia parcial (contains / includes)
  const medicamentosFiltrados = medicamentos.filter((med) => {
    if (!terminoBusqueda) return true; // Muestra todo si el campo está vacío

    const busqueda = terminoBusqueda.toLowerCase();
    
    // Validar que el campo 'indications' exista y sea un arreglo
    if (!med.indications || !Array.isArray(med.indications)) return false;

    // Retorna verdadero si alguna indicación contiene la palabra escrita
    return med.indications.some((indicacion) =>
      indicacion.toLowerCase().includes(busqueda)
    );
  });

  return (
    <div className="app-container">
      <header className="header-section">
        <h1>Buscador Clínico de Medicamentos</h1>
        <p className="subtitle">Ingrese el síntoma, órgano o condición médica para realizar el filtrado:</p>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="¿Cuál es su indicación? (Ej: kidneys, liver support, pain...)"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main className="cards-grid">
        {medicamentosFiltrados.map((med) => (
          <div key={med.id} className="medicine-card">
            <div className="card-accent"></div>
            <h2 className="medicine-name">{med.name}</h2>
            <p className="medicine-brand"><strong>Marca:</strong> {med.brand}</p>
            <p className="medicine-description">{med.description}</p>
            
            <div className="technical-info">
              <span><strong>Dosis:</strong> {med.daily_dosage} al día</span>
              <span><strong>Cantidad:</strong> {med.quantity} {med.presentation}</span>
            </div>

            <div className="indications-container">
              <strong>Indicaciones:</strong>
              <div className="tags-wrapper">
                {med.indications && med.indications.map((ind, index) => (
                  <span key={index} className="indication-tag">{ind}</span>
                ))}
              </div>
            </div>

            <a 
              href={med.buying_link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="buy-button"
            >
              Ver en Amazon
            </a>
          </div>
        ))}

        {medicamentosFiltrados.length === 0 && (
          <div className="no-results-box">
            <p>No se encontraron medicamentos que coincidan con la indicación: <strong>"{terminoBusqueda}"</strong></p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;