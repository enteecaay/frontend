import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-text">Vương Tay Chèo</span>
        </div>
        
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link 
              to="/game" 
              className={`nav-link ${isActive('/game') ? 'active' : ''}`}
            >
              Trò chơi
            </Link>
          </li>
          <li>
            <Link 
              to="/ai-usage" 
              className={`nav-link ${isActive('/ai-usage') ? 'active' : ''}`}
            >
              AI Usage
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
