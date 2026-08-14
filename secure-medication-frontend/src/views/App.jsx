import React, { useState, useEffect } from 'react';
import Login from './Login';
import Cart from './Cart';
import '../css/App.css';

const MEDICINES_API_URL = 'https://gateway-eile.onrender.com/gateway/medicinesMRS/medicine/home';

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
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [medicamentos, setMedicamentos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetch(MEDICINES_API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((data) => setMedicamentos(Array.isArray(data) ? data : []))
        .catch((error) => console.error('Error al conectar con la API de medicinas:', error));
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

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentView('home');
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      <header className="header-section" style={{ position: 'relative' }}>
        <h1>Secure Medication</h1>
        <p>Need anything? Then please enter the medicines you need in the search bar</p>
        
        <div style={{ position: 'absolute', top: '0', right: '0', display: 'flex', gap: '10px' }}>
          <button onClick={() => setCurrentView('home')} className="buy-button">Inicio</button>
          <button onClick={() => setCurrentView('cart')} className="buy-button">Carrito</button>
          <button onClick={handleLogout} className="buy-button" style={{ background: '#d9534f' }}>Cerrar Sesión</button>
        </div>

        {currentView === 'home' && (
          <div className="search-box">
            <input
              type="text"
              placeholder="¿Cuál es su indicación?"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </header>

      <main>
        {currentView === 'home' ? (
          <div className="cards-grid">
            {medicamentosFiltrados.map((med) => (
              <div key={med.id} className="medicine-card">
                <div className="card-accent" />
                <h2 className="medicine-name">{med.name}</h2>
                <p className="medicine-brand"><strong>Marca:</strong> {med.brand}</p>
                <p className="medicine-description">{med.description}</p>
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
          </div>
        ) : (
          <Cart user={user} />
        )}
      </main>
    </div>
  );
}

export default App;