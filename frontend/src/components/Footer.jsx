import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();
  const navigate=useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/')
  };
  return (
    <footer className="footer bg-gray-200 py-4 text-center">
      <div className="ft container">
        <div className="row">
          <div className="col-md-4">
            <h3 onClick={handleClick}>Our Services</h3>
          </div>
          <div className="col-md-4">
            <h3 onClick={handleClick}>About us</h3>
          </div>
          <div className="col-md-4">
            <h3 onClick={handleClick}>Contact Us</h3>
          </div>
        </div>
      </div>
      <h3 className="text-gray-600">Copyright ⓒ {year}</h3>
    </footer>
  );
}

export default Footer;
