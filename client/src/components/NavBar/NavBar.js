import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assests/logo.svg'
import { FaAlignRight } from "react-icons/fa"
import './navbar.css'

const NavBar = ({ user, setUser, onLogin }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    })
  }
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={Logo} alt="Hotel Resort" />
          </Link>
          <button type='button' className='nav-btn' onClick={handleToggle}>
            <FaAlignRight className='nav-icon' />
          </button>
        </div>
        <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/rooms'>Rooms</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/contact'>Contact</Link>
          </li>
        </ul> 
      </div>
    </nav>
  )
}

export default NavBar