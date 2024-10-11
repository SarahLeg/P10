import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/userSlice';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser({ email, password }))
      .then((rep) => {
        console.log(rep.payload);
        if(rememberMe){
          localStorage.setItem("token", rep.payload.token)
        }
        //le token va être stocké si rememberMe a été coché
        navigate('/dashboard');
      })
      .catch((err) => {
        setError('Invalid email or password');
        console.error(err);
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
            <input type="checkbox" id="remember-me" onChange={(e) => setRememberMe(e.target.value)}/>
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