import React, { useState } from 'react';
import '../css/Login.css';

const USERS_API_URL = 'https://gateway-eile.onrender.com/gateway/usersMRS/users';

function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${USERS_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, password }),
      });

      if (!response.ok) throw new Error('Credenciales incorrectas');

      const data = await response.json();
      onLoginSuccess(data);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${USERS_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, password }),
      });

      if (!response.ok) throw new Error('Error al registrar usuario');

      alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
      setIsRegistering(false);
      setCorreo('');
    } catch (err) {
      setError(err.message || 'Error en el registro');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Secure Medication</h1>
        <p>The place to find the medicines you need</p>
      </div>

      <div className="login-right">
        <div className="login-form-wrapper">
          <h2>{isRegistering ? 'Crear Cuenta' : 'Welcome Back!'}</h2>
          <p className="subtitle">
            {isRegistering ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
            <span className="toggle-link" onClick={() => { setIsRegistering(!isRegistering); setError(''); }}>
              {isRegistering ? 'Inicia sesión ahora.' : 'Crea una cuenta nueva.'}
            </span>
          </p>

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            {isRegistering && (
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            )}
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              {isRegistering ? 'Registrarse' : 'Login Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;