import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'map', label: ' Interactive Map', icon: '🗺️' },
    { id: 'explore', label: ' Explore', icon: '🌴' },
    { id: 'community', label: ' Community', icon: '🌏' },
    { id: 'profile', label: ' My Travels', icon: '👤' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🇵🇭 Landscapes</h1>
          <p className="navbar-tagline">Discover the Beauty of the Philippines</p>
        </div>
        
        <div className="navbar-menu">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
