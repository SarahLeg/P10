import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from '../assets/argentBankLogo.png';

function Layout() {
  return (
    <div>
      <nav className="main-nav">
        {/* quitte à utiliser link j'ai aussi rajouté ça sur le logo */}
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
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