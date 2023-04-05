import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="rooms-header">
      <div className="banner">
        <h1 className="banner-heading">Welcome to our Rooms</h1>
        <div className="banner-divider"></div>
        <Link to="/rooms" className="btn-primary banner-btn">
          View Rooms
        </Link>
      </div>
    </header>
  );
};

export default Header;
