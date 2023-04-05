import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { RoomsContainer, RoomCard, Title } from '../../styles/RoomsStyles';
import './rooms.css'

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/rooms', {
          credentials: 'include'
        });
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  const filterRooms = (room) => {
    if (category && room.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    if (price && room.price > parseInt(price)) {
      return false;
    } else {
      return true;
    }
  }

  const filteredRooms = rooms.filter(filterRooms)

  return (
    <div className='rooms-container'>
      <Header />
      <Title>Available Rooms</Title>
      <div className='filter-container'>
        <label className='filter-label'>
          Category:
          <input type='text' placeholder='search by category' value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label className='filter-label'>
            Price:
            <input type="number" placeholder='search by price' value={price} onChange={e => setPrice(e.target.value)} />
        </label>
      </div>
      <RoomsContainer>
        {filteredRooms.map(room => (
          <RoomCard key={room.id}>
            <img src={room.img_url} alt={room.name} />
            <h2>{room.name}</h2>
            <p>{room.category}</p>
            <p>${room.price} / night</p>
            <Link to={`/rooms/${room.id}`}>
              <button className='see-more-button'>See More</button>
            </Link>
          </RoomCard>
        ))}
      </RoomsContainer>
    </div>
  );
};

export default Rooms;
