import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/userSlice';
import Logo from '../assets/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  console.log('user:', user); 
  console.log('userName:', user.userName);

  const handleUserClick = () => {
    navigate('/dashboard')
  }

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

        <div className="main-nav-user">
          {token ? (
            <>
              <button onClick={handleUserClick} className="user-item">
                <p>{user.userName || 'Loading...'}</p>
                <FontAwesomeIcon icon={faCircleUser} className='user-icon' />
              </button>

              <button className="main-nav-item">
                <FontAwesomeIcon icon={faGear} className='user-icon' />
              </button>

              <button onClick={handleLogout} className="main-nav-item">
                <FontAwesomeIcon icon={faPowerOff} className='user-icon' />
              </button>
            </>
          ) : (
            <Link className='sign-in' to="/sign-in">
              <FontAwesomeIcon icon={faCircleUser}/>
              Sign In
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
