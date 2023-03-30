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

function App() {
  const [user, setUser] = useState(null);

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
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path='/footer' element={<Footer />} />
      </Routes>
    </>
  );
}

export default App;
