import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css';

const Banner = () => {
  return (
    <div className='banner-img'>
      <div className='banner'>
        <h1 className='banner-heading'>Luxurious Rooms</h1>
        <p className='banner-text'>Deluxe rooms for affordable prices</p>
        <Link to='/rooms' className='btn-primary'>
          Our Rooms
        </Link>
      </div>
    </div>
  );
};

export default Banner;
