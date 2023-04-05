import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col">
            <p>Book your stay now and experience luxury at an affordable price.</p>
          </div>
          <div className="footer-col">
            <ul>
              <li><Link to="/rooms">Rooms</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
              <a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
              <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-col">
            <p>&copy; 2023 Hotel Reservation</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
