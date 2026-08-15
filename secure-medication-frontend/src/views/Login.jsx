import React, { useState } from 'react';
import '../css/App.css'; 

const USERS_API = 'https://gateway-eile.onrender.com/gateway/usersMRS/api/users';

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ userName: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpoint = isLogin ? 'login' : 'register';

    try {
      const response = await fetch(`${USERS_API}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error en el servidor');
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        setMessage('¡Inicio de sesión exitoso!');
        onLoginSuccess(data.user || { id: data.id || 1, userName: form.userName });
      } else {
        setMessage('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Secure Medication</h1>
        <p>Bienvenido. Por favor ingresa a tu cuenta o regístrate para acceder a nuestro catálogo de medicamentos.</p>
      </div>
      
      <div className="login-right">
        <div className="login-form-wrapper">
          <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
          <p className="subtitle">
            {isLogin ? 'Ingresa tus credenciales para continuar.' : 'Crea una cuenta nueva para continuar.'}
          </p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Nombre de Usuario"
              value={form.userName}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">
              {isLogin ? 'Ingresar' : 'Crear Cuenta'}
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
            </span>
          </p>

          {message && <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}