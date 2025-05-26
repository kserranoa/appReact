import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import TextForm from './components/TextForm/TextForm';
import DataTable from './components/DataTable/DataTable';
import { auth } from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';

/**
 * Componente principal de la aplicación
 * @returns JSX.Element
 */
const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="app-loading">Cargando aplicación...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={!user ? <Login /> : <TextForm />} />
          <Route path="/form" element={user ? <TextForm /> : <Login />} />
          <Route path="/data" element={user ? <DataTable /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;