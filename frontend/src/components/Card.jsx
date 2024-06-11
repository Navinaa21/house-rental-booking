import React from 'react';
import './Com.css'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useNavigate } from 'react-router-dom';
const Card = ({ image, title, description }) => {
  const navigate=useNavigate();
  const detailpage = (e) => {
    e.preventDefault();
    navigate('/signup')
  };
  return (
    <div className="card">
        <h1 className='card-image' >{image}</h1>
      {/*<img src={image} alt={title} className="card-image" />*/}
      <div className="card-content">
        
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className='find-home' onClick={detailpage}>Find A Home <TrendingFlatIcon/></p>        
      </div>
    </div>
  );
};

export default Card;
