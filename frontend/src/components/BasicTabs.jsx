import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Com.css';
import { useState,useEffect } from "react";
export default function BasicTabs() {
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState({
    img: null,
    title: '',
    location: '',
    price: '',
    bedroom: '',
    plotarea: '',
    furnishing: '',
    carparking: '',
    water: '',
    bed: '',
    blender: '',
    microwave: '',
    refrigerator: '',
    bathroom: '',
    email: '',
    phone: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare form data for upload
    const formDataToUpload = new FormData();
    for (const key in formData) {
      formDataToUpload.append(key, formData[key]);

    }

    // Replace with your backend endpoint
    axios.post('https://house-rental-booking.onrender.com/api/houses', formDataToUpload)
      .then(response => {
        window.location.reload();
        console.log('House details uploaded:', response.data);
      })
      .catch(error => {
        console.error('There was an error uploading the house details!', error);
      });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Store the file object
    });
  };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userid = queryParams.get('id');
    const [houseDetails, setHouseDetails] = useState([]);
    useEffect(() => {
      console.log(`Fetching details for houseId: id=${userid}`);
      axios.get(`https://house-rental-booking.onrender.com/api/houses/update?id=${userid}`)
      
        .then(response => {
          console.log('Fetched house details:', response.data);
          setHouseDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching house details:', error);
        });
    }, [userid]);


    const handleDelete = (houseId) => {
      // Replace with your backend endpoint for deleting a house
      axios.delete(`https://house-rental-booking.onrender.com/api/houses/${houseId}`)
        .then(response => {
          console.log('House deleted:', response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error('There was an error deleting the house!', error);
        });
    };
  

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box className='tl' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList  onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upload" value="1" />
              <Tab label="Posts" value="2" />
              <Tab label="Payment History" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <form className='frm' onSubmit={handleSubmit} >
                <h1 className='hd'>HOUSE DETAILS</h1>
                <label>Upload Image</label>
                <input
                    type="file"
                    name="img"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Bedroom"
                name="bedroom"
                value={formData.bedroom}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Plot Area"
                name="plotarea"
                value={formData.plotarea}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Furnishing"
                name="furnishing"
                value={formData.furnishing}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Car Parking"
                name="carparking"
                value={formData.carparking}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Water Availability"
                name="water"
                value={formData.water}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Bed"
                name="bed"
                value={formData.bed}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Blender"
                name="blender"
                value={formData.blender}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Microwave"
                name="microwave"
                value={formData.microwave}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Refrigerator"
                name="refrigerator"
                value={formData.refrigerator}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Bathroom"
                name="bathroom"
                value={formData.bathroom}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              
              <Button className='btt' type="submit" variant="contained" color="primary">
                Upload
              </Button>
            </form>
          </TabPanel>
          <TabPanel className='hdm' value="2"><h1>The uploaded posts will appear here..</h1>
          <div className="container1">
          <div className="card-container">
            {houseDetails.map((house) => (
              <div className="card1" key={house.ID}>
                <img src={`https://house-rental-booking.onrender.com/images/${house.img}`} alt={house.title} className="card-image1" />
                <div className="card-details">
                  <h2 className="card-title1">{house.title}</h2>
                  <p className="card-location">Location : {house.location}</p>
                  <p className="card-price">Price : {house.price}</p>
                  <p className="card-info">{house.bedroom} | {house.bathroom}</p>
                  <p className="card-info">{house.plotarea}</p>
                  <p className="card-info">Furnishing : {house.furnishing}</p>
                  <p className="card-info">Car Parking : {house.carparking}</p>
                  <button className="buy-btn" onClick={() => handleDelete(house.ID)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel className='hdm' value="3">
        <h1>The payment made for houses will appear here..</h1>
        <div className="container2">
          <div className="card-container1">
            {houseDetails
              .filter(house => house.First_Name !== null && house.Last_Name !== null) // Filter out houses with null payment details
              .map((house) => (
                <div className="card2" key={house.ID}>
                  <div className="card-details1">
                    <h2 className="">Name :{house.First_Name} {house.Last_Name}</h2>
                    <p className="">House : {house.title}</p>
                    <p className="">Mobile Number : {house.mobile}</p>
                    <p className="">Address : {house.address}</p>
                    <p className="">{house.city} | {house.state}</p>
                    <p className="">Zip : {house.zip}</p>
                    <p className="">Country : {house.country}</p>
                    <p className="">Payment : {house.advance}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </TabPanel>

        </TabContext>
      </Box>
    </div>
  );
}

