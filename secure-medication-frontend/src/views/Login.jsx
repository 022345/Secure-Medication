import React, { useState } from 'react';
import '../css/Login.css';

const USERS_API = 'https://gateway-eile.onrender.com/gateway/usersMRS/users';

function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ nombre: '', correo: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegistering ? 'register' : 'login';

    try {
      const response = await fetch(`${USERS_API}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error(isRegistering ? 'Error al registrar' : 'Credenciales incorrectas');

      if (isRegistering) {
        alert('Cuenta creada exitosamente. Inicia sesión.');
        setIsRegistering(false);
      } else {
        const data = await response.json();
        onLoginSuccess(data);
      }
    } catch (err) {
      setError(err.message);
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

          <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
            {isRegistering && (
              <input type="email" name="correo" placeholder="Correo electrónico" value={form.correo} onChange={handleChange} required />
            )}
            <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
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