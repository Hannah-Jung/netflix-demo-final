import React, { useState } from 'react';
import './Footer.style.css';

const Footer = () => {

  return (
    <footer className="footer">      
      <div className="footer-columns">
        <div className="footer-column">
          <p>FAQ</p>
          <p>About</p>
          <p>Ways to Watch</p>
          <p>Cookie Preferences</p>
        </div>
        <div className="footer-column">
          <p>Help Center</p>
          <p>Jobs</p>
          <p>Terms of Use</p>
          <p>Contact Us</p>
        </div>
        <div className="footer-column">
          <p>Account</p>
          <p>Redeem Gift Cards</p>
          <p>Buy Gift Cards</p>
          <p>Privacy</p>
        </div>
      </div>
      <div className="footer-copyright">
        © 1997-2025 Netflix, Inc
      </div>
    </footer>
  );
};

export default Footer;