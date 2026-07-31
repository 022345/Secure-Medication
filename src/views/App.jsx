import React, { useState, useEffect } from 'react';
import Login from './Login';
import '../css/App.css';

const API_URL = 'https://secure-medication.onrender.com/medicines';

const diccionarioSintomas = {
  "riñon": "kidney", 
  "riñones": "kidneys", 
  "higado": "liver", "hígado": "liver",
  "dolor": "pain", "vejiga": "bladder", "corazon": "heart", "corazón": "heart",
  "articulaciones": "joints", "tracto urinario": "urinary tract",
  "antioxidante": "antioxidant", "soporte de higado": "liver support"
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [medicamentos, setMedicamentos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${tu_token_jwt}` 
        }
      })
        .then((response) => response.json())
        .then((data) => setMedicamentos(data))
        .catch((error) => console.error('Error al conectar con la API:', error));
    }
  }, [isLoggedIn]);

  const medicamentosFiltrados = medicamentos.filter((med) => {
    if (!terminoBusqueda) return true;

    const oracionUsuario = terminoBusqueda.toLowerCase();
    const palabrasUsuario = oracionUsuario.split(/\s+/).filter(p => p.length > 0);

    if (!med.indications || !Array.isArray(med.indications)) return false;

    const indicacionesMed = med.indications.map(ind => ind.toLowerCase());

    return palabrasUsuario.some((palabra) => {
      const traduccionPalabra = diccionarioSintomas[palabra];
      const traduccionOracionCompleta = diccionarioSintomas[oracionUsuario];

      return indicacionesMed.some((indicacion) => {
        const coincidePalabraOriginal = indicacion.includes(palabra);
        const coincideTraduccionPalabra = traduccionPalabra ? indicacion.includes(traduccionPalabra) : false;
        const coincideTraduccionCompleta = traduccionOracionCompleta ? indicacion.includes(traduccionOracionCompleta) : false;

        return coincidePalabraOriginal || coincideTraduccionPalabra || coincideTraduccionCompleta;
      });
    });
  });

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      <header className="header-section">
        <h1>Secure Medication</h1>
        <p>Need anything? Then please enter the medicines you need in the search bar</p>
        <button onClick={() => setIsLoggedIn(false)} style={{ position: 'absolute', top: '20px', right: '20px' }}>Cerrar Sesión</button>
        <div className="search-box">
          <input
            type="text"
            placeholder="¿Cuál es su indicación?"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <main className="cards-grid">
        {medicamentosFiltrados.map((med) => (
          <div key={med.id} className="medicine-card">
            <h2 className="medicine-name">{med.name}</h2>
            <p><strong>Marca:</strong> {med.brand}</p>
            <p>{med.description}</p>
            <div className="technical-info">
              <span><strong>Dosis:</strong> {med.daily_dosage}</span>
            </div>
            <div className="indications-container">
              {med.indications?.map((ind, index) => (
                <span key={index} className="indication-tag">{ind}</span>
              ))}
            </div>
            <a href={med.buying_link} target="_blank" rel="noopener noreferrer" className="buy-button">
              Ver en Amazon
            </a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;