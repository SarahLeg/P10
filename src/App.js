import React from 'react';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/layout.js';
import Home from './pages/home.js';
import SignIn from './pages/sign-in.js';
import Dashboard from './pages/dashboard.js';

function App() {
  
  // Sélection du token dans le state global
  const token = useSelector((state) => state.user.token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          {/* Si le token existe, accorde l'accès à Dashboard, sinon redirige vers sign-in */}
          <Route
            path="dashboard"
            element={token ? <Dashboard /> : <Navigate to="/sign-in" replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;