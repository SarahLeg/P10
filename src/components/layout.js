import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/userSlice';
import Logo from '../assets/argentBankLogo.png';
import userIcon from '../assets/circle-user-solid.svg';
import optionsIcon from '../assets/gear-solid.svg';
import signoutIcon from '../assets/power-off-solid.svg';

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  console.log('user:', user); 
  console.log('userName:', user.userName);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="ArgentBank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div>
          {token ? (
            <>
              <span className="main-nav-item">
                <img src={userIcon} alt="User Icon"/>
                {user.userName || 'Loading...'}
              </span>

              <span className="main-nav-item">
                <img src={optionsIcon} alt="Options"/>
              </span>

              <span onClick={handleLogout} className="main-nav-item">
                <img src={signoutIcon} alt="Sign Out"/>
              </span>
            </>
          ) : (
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i> Sign In
            </Link>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}

export default Layout;
