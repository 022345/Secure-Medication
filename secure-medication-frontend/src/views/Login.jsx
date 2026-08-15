import { useState } from 'react';
import React, { useState } from 'react';

const USERS_API = 'https://tu-backend-api.com/api/users'; // Ajusta con la URL de tu API C#

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ userName: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Operador ternario: si isLogin es true va a 'login', si no va a 'register'
    const endpoint = isLogin ? 'login' : 'register';

    try {
      const response = await fetch(`${USERS_API}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ocurrió un error');
      }

      if (isLogin) {
        // AQUÍ ENTRA EL JWT: Guardas el token que te devuelve el backend
        localStorage.setItem('token', data.token);
        setMessage('¡Inicio de sesión exitoso!');
      } else {
        setMessage('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
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
        <button type="submit">{isLogin ? 'Ingresar' : 'Crear Cuenta'}</button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}