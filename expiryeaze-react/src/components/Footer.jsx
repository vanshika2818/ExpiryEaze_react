import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <small className="text-muted">© 2025 ExpiryEaze. All rights reserved.</small>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/terms" className="text-decoration-none text-muted me-3">
              <small>Terms & Conditions</small>
            </Link>
            <Link to="/privacy" className="text-decoration-none text-muted">
              <small>Privacy Policy</small>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
