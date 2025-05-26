import React, { useState } from 'react';
import './Login.css';
import { auth, googleProvider, signInWithPopup } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

/**
 * Componente para autenticación con Google
 * @returns JSX.Element
 */
const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Maneja el inicio de sesión con Google
   * @async
   * @returns {Promise<void>}
   */
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/form');
    } catch (err) {
      setError(err.message);
      console.error('Error en autenticación:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <button 
        onClick={handleGoogleLogin}
        className="google-login-btn"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;