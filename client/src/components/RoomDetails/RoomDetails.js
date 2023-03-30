import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`/rooms/${id}`)
      .then(response => response.json())
      .then(setRoom);
  }, [id]);

  if (!room) {
    return (
      <div>
        <Header />
        <p>Loading room details...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <h2>{room.name}</h2>
        <p>{room.category}</p>
        <p>${room.price}</p>
        <p>{room.size} Sq. feet</p>
        <p>{room.capacity} person(s) capacity</p>
        <p>{room.breakfast ? 'Breakfast included' : 'No breakfast included'}</p>
        <p>{room.description}</p>
        <ul>
          {Array.isArray(room.extras) && room.extras.map(extra => (
            <li key={extra.id}>{extra.name}</li>
          ))}
        </ul>
        <img src={room.img_url} alt={room.name} />
        <button>Book Now</button>
      </div>
    </div>
  );
};

export default RoomDetails;
