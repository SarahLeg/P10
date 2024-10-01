import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditUser from '../components/edit-user';
import Account from '../components/account';
import { getUser } from '../Redux/userSlice'; // Action Redux pour récupérer les données utilisateur

function Dashboard() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  
  // Récupérer les informations de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    // Si le token est présent, on récupère les informations utilisateur
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token]);

  return (
    <body className="main bg-dark">
      <div className="header">
          <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}` : 'User'}!</h1>
          <EditUser user={user} token={token}/>
      </div>
      <Account title="Argent Bank Checking (x3448)" amount="48,098.43" description="Available Balance" />
      <Account title="Argent Bank Checking (x3448)" amount="48,098.43" description="Available Balance" />
      <Account title="Argent Bank Checking (x3448)" amount="48,098.43" description="Available Balance" />
    </body>
  );
}

export default Dashboard;