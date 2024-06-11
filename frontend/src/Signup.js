import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Footer from "./components/Footer";
import { Link } from 'react-router-dom';
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded';
const Signup = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    role:'',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted");
      await axios.post('https://house-rental-booking.onrender.com/api/auth/signup', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };



  const handleclick = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    navigate('/login')
  };

  return (
    <div className="bck-ig flex flex-col h-screen">
        <header className="header text-white text-center py-3">
            <h1 className="font-mono text-2xl font-bold"><HouseSidingRoundedIcon style={{ fontSize: 30 }}/>CozyQuarters</h1>
        </header>
        <div className="flex justify-center items-center h-screen">
        <form action='' className="fm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>
            <div className="mb-4">
            <div className="drop ">
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option>--role--</option>
                        <option>Buyer</option>
                        <option>Renter</option>
                        
                    </select>
                </div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            </div>
            <p className='alr' onClick={handleclick}>Already have an account? <Link to="/login">Login</Link></p>
            <div className="st">
            <button
                className="stbt bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit" 
            >
                Sign Up
            </button>
            
            </div>
            
        </form>
        
        </div>
        <div className='ffot'><Footer/></div>
    </div>
  );
};

export default Signup;

