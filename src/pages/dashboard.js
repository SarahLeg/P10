import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditUser from '../components/edit-user';
import Account from '../components/account';
import { getUser } from '../Redux/userSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token]);

  return (
    <div className="body main">
      <div className="header">
          <h1>Welcome back<br />{user ? `${user.firstName} ${user.lastName}` : 'User'}!</h1>
          <EditUser user={user} token={token}/>
      </div>
      <Account title="Argent Bank Checking (x3448)" amount="48,098.43" description="Available Balance" />
      <Account title="Argent Bank Checking (x3448)" amount="48,098.43" description="Available Balance" />
      <Account title="Argent Bank Checking (x3448)" amount="48,098.43" description="Available Balance" />
    </div>
  );
}

export default Dashboard;