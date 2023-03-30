import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { RoomsContainer, RoomCard, Title } from '../../styles/RoomsStyles';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('/rooms')
      .then(response => response.json())
      .then(setRooms);
  }, []);

  return (
    <div>
      <Header />
      <Title>Available Rooms</Title>
      <RoomsContainer>
        {rooms.map(room => (
          <RoomCard key={room.id}>
            <img src={room.img_url} alt={room.name} />
            <h2>{room.name}</h2>
            <p>{room.category}</p>
            <p>${room.price} / night</p>
            <Link to={`/rooms/${room.id}`}>
              <button>See More</button>
            </Link>
          </RoomCard>
        ))}
      </RoomsContainer>
    </div>
  );
};

export default Rooms;
