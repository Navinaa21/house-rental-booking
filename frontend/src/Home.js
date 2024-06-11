import React from 'react';
import Footer from "./components/Footer";
//import { Carousel } from 'react-responsive-carousel';
//import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg'; // Import the image
import image4 from './images/image4.jpg'
import SearchIcon from '@mui/icons-material/Search';
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import BedIcon from '@mui/icons-material/Bed';
import './App.css'
import Card from './components/Card';

import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
//import ExampleCarouselImage from './i';
function Home() {
  const navigate=useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate('/')
  };
  const Click = (e) => {
    e.preventDefault();
    navigate('/signup')
  };
  const detailpage = (e) => {
    e.preventDefault();
    navigate('/details')
  };
  return (
    <div className='home-pg'>
        <div className='top-up'>
            <nav className="p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left side: Logo */}
                    <div className="flex items-center" onClick={handleClick} >
                    <HouseSidingRoundedIcon style={{ fontSize: 40 }}/><p className="font-mono  font-bold">CozyQuarters</p>
                    </div>
                    
                    {/* Middle: Navigation Links */}
                    <div className="flex justify-center">
                    <span className="text-black font-bold">
                        <span className="border-b-2 border-orange-500" onClick={handleClick}>Home</span>
                    </span>
                    <span className="text-black mx-4" onClick={handleClick}>Services</span>
                    <span className="text-black mx-4" onClick={detailpage}>Pricing</span>
                    <span className="text-black mx-4" onClick={detailpage}>Contact</span>
                    </div>

                    {/* Right side: Sign Up */}
                    <div>
                    <button className="text-black font-bold border-2 border-orange-500 px-4 py-2 rounded-full" onClick={Click}>
                        Sign Up
                    </button>

                    </div>
                </div>
            </nav>
            <div>
                <div className="image-grid">
                  <img className='im2' src={image2} alt="Image 2" />
                </div>
                <h2 className='wri'>THE KEYS TO</h2>
                
                <h2 className='ri'>YOUR HOME</h2>
                <h2 className='wri2'>We are Real Estate Agency that will help you to find<br /> the most suitable residence for you.</h2>
                <div className="sbr ">
                  <input type="text" placeholder="Search..." className="border border-gray-300 px-4 py-2 rounded-full focus:outline-none " />
                  <button className="sh text-white font-bold px-4 py-2 rounded-full ml-2"><SearchIcon/></button>
                </div>
                <div className="h1-container">
                <h1 className='blw'><div className='gp'>3k+</div> Happy <br/> Customer</h1>
                <h1 className='blw'><div className='gp'>8k+</div> Premium <br/>Product</h1>
                <h1 className='blw'><div className='gp'>22k+</div> Award <br/>Winning</h1>
                </div>
                
            </div>
            
        </div>
        
        <div className='caro'>
        <Carousel>
          <Carousel.Item interval={1000}>
            {/* <image2 text="First slide" /> */}
            <img src={image2}/>
  
          </Carousel.Item>
          <Carousel.Item interval={500}>
          <img src={image3}/>
            
          </Carousel.Item>
          <Carousel.Item>
          <img src={image4}/>
            
          </Carousel.Item>
        </Carousel>
        </div>
        <div className='btm'>
                <button onClick={detailpage}>Explore Now!!</button>
        </div>
        <div>
            <h1 className='imp'>Our Main Focus</h1>
        </div>
        <div className='cards-container'>
          <Card
            image={<InventoryIcon/>}
            title="Buy a home"
            description="Over 1 million+ houses for sale available on the websilte, we can match you with a house you will want to call home."
          />
          <Card
            image={<HomeIcon/>}
            title="Rent a home"
            description="Over 1 million+ homes for sale available on the websilte, we can match you with a house you will want to call home."
          />
          <Card
            image={<BedIcon/>}
            title="Sell a home"
            description="Over 1 million+ houses for sale available on the website, we can match you with a house you will want to call home."
          />
        </div>
        <Footer/>
    </div>
  );
}

export default Home;

