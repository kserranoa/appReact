import React, { useState, useEffect } from 'react';
import './DataTable.css';
import { database, ref, onValue } from '../../firebase/config';

/**
 * Componente para mostrar datos de Realtime Database en tabla
 * @returns JSX.Element
 */
const DataTable = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Obtiene y escucha cambios en los datos
   * @returns {function} Función para desuscribirse
   */
  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    
    const unsubscribe = onValue(messagesRef, 
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const formattedMessages = Object.entries(data).map(([id, message]) => ({
              id,
              ...message
            }));
            setMessages(formattedMessages);
          } else {
            setMessages([]);
          }
          setLoading(false);
        } catch (err) {
          setError('Error al procesar datos');
          console.error('Error:', err);
          setLoading(false);
        }
      }, 
      (err) => {
        setError('Error al cargar datos');
        console.error('Error:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="loading">Cargando datos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="table-container">
      <h2>Datos Guardados</h2>
      {messages.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Texto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.userEmail}</td>
                <td>{message.text}</td>
                <td>{new Date(message.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos para mostrar</p>
      )}
    </div>
  );
};

export default DataTable;