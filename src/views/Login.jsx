import React, { useState } from 'react';
import '../css/Login.css';

function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (nombre && password) {
      onLoginSuccess();
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (nombre && correo && password) {
      setIsRegistering(false);
      setCorreo('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Hello<br/>Secure Medication!</h1>
        <p>Encuentra tus medicamentos rápidamente. Evita búsquedas repetitivas y ahorra tiempo cuidando tu salud.</p>
      </div>

      <div className="login-right">
        <div className="login-form-wrapper">
          <h2>{isRegistering ? 'Crear Cuenta' : 'Welcome Back!'}</h2>
          <p className="subtitle">
            {isRegistering ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
            <span className="toggle-link" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Inicia sesión ahora.' : 'Crea una cuenta nueva.'}
            </span>
          </p>

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