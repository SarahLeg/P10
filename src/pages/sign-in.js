import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { loginUser } from '../Redux/userSlice';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const navigate = useNavigate(); // Pour la navigation
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Envoi de la requête de connexion
    dispatch(loginUser({ email, password }))
      .then(() => {
        // Redirection vers la page des comptes après une connexion réussie
        navigate('/accounts');
      })
      .catch((err) => {
        // Gestion des erreurs
        setError('Invalid email or password');
        console.error(err); // Pour déboguer en cas d'erreur
      });
  };

  

  return (
    <main className="main bg-dark">
      <div className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {error && <p className="error-message">{error}</p>} {/* Affichage des erreurs */}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignIn;