import React, { useState, useEffect } from 'react';
import '../css/App.css';

// Diccionario de traducción Español -> Inglés (Todo en minúsculas)
const diccionarioSintomas = {
  "riñon": "kidney",
  "riñones": "kidneys",
  "higado": "liver",
  "hígado": "liver",
  "dolor": "pain",
  "vejiga": "bladder",
  "corazon": "heart",
  "corazón": "heart",
  "articulaciones": "joints",
  "tracto urinario": "urinary tract",
  "antioxidante": "antioxidant",
  "soporte de higado": "liver support"
};

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

  // Lógica de filtrado flexible por contenido de oración
  const medicamentosFiltrados = medicamentos.filter((med) => {
    if (!terminoBusqueda) return true; // Muestra todo si el campo está vacío

    // Convertir la oración del usuario a minúsculas, limpiar espacios y dividirla en palabras individuales
    const oracionUsuario = terminoBusqueda.toLowerCase();
    const palabrasUsuario = oracionUsuario.split(/\s+/).filter(palabra => palabra.length > 0);

    // Validar que el campo 'indications' exista y sea un arreglo
    if (!med.indications || !Array.isArray(med.indications)) return false;

    // Convertir todas las indicaciones del medicamento actual a minúsculas para comparar libremente
    const indicacionesMed = med.indications.map(ind => ind.toLowerCase());

    // El medicamento pasa el filtro si AL MENOS una palabra o traducción de la oración coincide con las indicaciones
    return palabrasUsuario.some((palabra) => {
      // 1. Verificar si la palabra individual o la oración completa tiene traducción en el diccionario
      const traduccionPalabra = diccionarioSintomas[palabra];
      const traduccionOracionCompleta = diccionarioSintomas[oracionUsuario];

      // 2. Evaluar coincidencias parciales (includes) en las indicaciones del medicamento
      return indicacionesMed.some((indicacion) => {
        const coincidePalabraOriginal = indicacion.includes(palabra);
        const coincideTraduccionPalabra = traduccionPalabra ? indicacion.includes(traduccionPalabra) : false;
        const coincideTraduccionCompleta = traduccionOracionCompleta ? indicacion.includes(traduccionOracionCompleta) : false;

        return coincidePalabraOriginal || coincideTraduccionPalabra || coincideTraduccionCompleta;
      });
    });
  });

  return (
    <div className="app-container">
      <header className="header-section">
        <h1>Buscador Clínico de Medicamentos</h1>
        <p className="subtitle">Ingrese el síntoma, órgano o condición médica para realizar el filtrado:</p>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="¿Cuál es su indicación? (Ej: dolor de estómago, salud del hígado...)"
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