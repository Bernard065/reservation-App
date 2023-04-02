import './App.css';
import { useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Rooms from './pages/Rooms/Rooms';
import RoomDetails from './components/RoomDetails/RoomDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer/Footer';
import Reservations from './components/Reservations/Reservations';
import Profile from './components/Profile/Profile';
import UpdateReservation from './components/UpdateReservation/UpdateReservation';


function App() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} onLogin={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails user={user} room={room} setRoom={setRoom} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path='/footer' element={<Footer />} />
        <Route path='/reservations' element={<Reservations user={user} room={room} />} />
        <Route path='/reservations/:id/edit' element={<UpdateReservation />} />
        <Route path='/profile' element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
