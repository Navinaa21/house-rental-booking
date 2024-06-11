import React, { useState, useEffect } from 'react';
import Footer from "./components/Footer";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded';
import './App.css'
import { connect } from 'react-redux';
import { openModal } from './actions';
import Modal1 from './Modal1'; 
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BlenderIcon from '@mui/icons-material/Blender';
import BedIcon from '@mui/icons-material/Bed';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import axios from 'axios';

function Details({ openModal, showModal,closeModal }) {
  const navigate = useNavigate();
  const [houseDetails, setHouseDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [selectedHouse, setSelectedHouse] = useState(null);
  useEffect(() => {
    // Fetch house details from the backend
    axios.get('http://localhost:8081/api/houses')
      .then(response => {
        setHouseDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the house details!', error);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const buyprod = (e,houseId) => {
    e.preventDefault();
    navigate(`/checkout?houseId=${houseId}`);
  };

  const filteredHouseDetails = houseDetails.filter(house => {
    const titleMatch = house.title.toLowerCase().includes(searchTerm.toLowerCase());
    const filterMatch = filterOption === '' || house.location.toLowerCase() === filterOption.toLowerCase();
    return titleMatch && filterMatch;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterOption(e.target.value);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (house) => {
    setSelectedHouse(house);;
    setShow(true);
  };

  return (
    <div className='dtl-pg'>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center" onClick={handleClick}>
            <HouseSidingRoundedIcon />
          </div>
          <div className="flex justify-center">
            <span className="text-black font-bold">
              <span className="border-b-2 border-orange-500" onClick={handleClick}>Home</span>
            </span>
            <span className="text-black mx-4" onClick={handleClick}>Services</span>
            <span className="text-black mx-4">Pricing</span>
            <span className="text-black mx-4" onClick={handleClick}>Contact</span>
          </div>
          <div>
            <button className="text-black font-bold border-2 border-orange-500 px-4 py-2 rounded-full" onClick={handleClick}>
              Log Out
            </button>
          </div>
        </div>
      </nav>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={filterOption}
          onChange={handleFilter}
          className="filter-select"
        >
          <option value="">All Locations</option>
          {houseDetails.map((house) => (
            <option key={house.ID} value={house.location}>{house.location}</option>
          ))}
        </select>
      </div>
      <div className="container1">
        <div className="card-container">
          {filteredHouseDetails.map((house) => (
            <div className="card1" key={house.ID}>
              <img src={`http://localhost:8081/images/${house.img}`} alt={house.title} className="card-image1" />
              <div className="card-details">
                <h2 className="card-title1">{house.title}</h2>
                <p className="card-location">Location : {house.location}</p>
                <p className="card-price">Price : {house.price}</p>
                <p className="card-info">{house.bedroom} | {house.bathroom}</p>
                <p className="card-info">{house.plotarea}</p>
                <p className="card-info">Furnishing : {house.furnishing}</p>
                <p className="card-info">Car Parking : {house.carparking}</p>
                <button className="contact-btn" onClick={() => {openModal(house); setSelectedHouse(house);}}>CONTACT</button>
                <button className='view-btn' onClick={() => handleShow(house)}>View More</button>
                <button className="buy-btn" onClick={(e) => buyprod(e, house.ID)}>Pay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='ftm'>
        <Footer />
        </div>
      {showModal && <Modal1 phone={selectedHouse?.phone} email={selectedHouse?.email} closeModal={closeModal} />} {/* Render modal if showModal is true */}
      
      <>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>HOUSE DETAILS:</Modal.Title>
          </Modal.Header>
          <Modal.Body className='mod1'>
            {selectedHouse && (
              <>
                <p><WaterDropIcon /> {selectedHouse.water} Water Purifier</p>
                <p><BedIcon /> {selectedHouse.bed} beds</p>
                <p><BlenderIcon /> {selectedHouse.blender} Blender</p>
                <p><MicrowaveIcon /> {selectedHouse.microwave} Microwave</p>
                <p><KitchenIcon /> {selectedHouse.refrigerator} Refrigerator</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showModal: state.modal.showModal,
});

const mapDispatchToProps = {
  openModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
