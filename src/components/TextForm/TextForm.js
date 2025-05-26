import React, { useState } from 'react';
import './TextForm.css';
import { database, ref, push } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';

/**
 * Componente para enviar texto a Realtime Database
 * @returns JSX.Element
 */
const TextForm = () => {
  const [text, setText] = useState('');
  const [user] = useAuthState(auth);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  /**
   * Maneja el envío del formulario
   * @param {React.FormEvent} e 
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setSubmissionStatus('error');
      return;
    }

    try {
      const messagesRef = ref(database, 'messages');
      await push(messagesRef, {
        text: text,
        userId: user.uid,
        userEmail: user.email,
        timestamp: Date.now()
      });
      setText('');
      setSubmissionStatus('success');
    } catch (err) {
      console.error('Error al guardar datos:', err);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Texto a la Base de Datos</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu texto aquí..."
          className="text-input"
        />
        <button type="submit" className="submit-btn">
          Enviar
        </button>
      </form>
      {submissionStatus === 'success' && (
        <p className="success-message">Texto guardado exitosamente!</p>
      )}
      {submissionStatus === 'error' && (
        <p className="error-message">Error al guardar el texto</p>
      )}
    </div>
  );
};

export default TextForm;