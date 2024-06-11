// Modal.js
import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from './actions';
import './App.css'
function Modal1({ closeModal, phone, email }) {
  return (
    <div className="modal-overlay">
      <div className="modal1">
        <h2>CONTACT DETAILS</h2>
        <p>Mobile number :{phone}</p>
        <p>Email : {email}</p>
        <div className='btn-mod'><button onClick={closeModal}>Close</button></div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  closeModal,
};

export default connect(null, mapDispatchToProps)(Modal1);
