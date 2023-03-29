import React from 'react'
import { Link } from 'react-router-dom'
import './banner.css'

const Banner = () => {
  return (
    <div className='banner-img'>
      <div className='banner'>
        <h1>Luxurious Rooms</h1>
        <p>Deluxe rooms for as low as $299</p>
        <Link to="/rooms" className="btn-primary">
            our rooms
        </Link>
      </div>
    </div>
  )
}

export default Banner