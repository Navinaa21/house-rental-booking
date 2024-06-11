import React from 'react';
import Footer from "./components/Footer";
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded';
import './App.css'
import BasicTabs from './components/BasicTabs';
import { useNavigate } from 'react-router-dom';

function Add() {
    const navigate=useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/');
      };
    
  return (
    <div className='add-pg'>
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
      <div className='tb'>
            <BasicTabs/>
        </div>
        <div className='ftm'>
        <Footer />
        </div>
    </div>
  );
}

export default Add;