import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
  return (
    <div className='rooms-header'>
        <div className='banner'>
            <Link to="/rooms" className="btn-primary">
                our rooms
            </Link>
        </div>
    </div>
  )
}

export default Header