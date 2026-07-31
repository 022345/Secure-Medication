import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí irá la petición al API Gateway para validar el login
    if (nombre && password) {
      onLoginSuccess();
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí irá la petición al API Gateway para registrar al usuario
    if (nombre && correo && password) {
      setIsRegistering(false);
      setCorreo('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {isRegistering ? (
        <form onSubmit={handleRegister} className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Registrarse</h2>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Crear cuenta</button>
          <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegistering(false)}>¿Ya tienes cuenta? Inicia sesión</p>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Iniciar Sesión</h2>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Entrar</button>
          <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegistering(true)}>¿No tienes cuenta? Regístrate</p>
        </form>
      )}
    </div>
  );
}

export default Login;