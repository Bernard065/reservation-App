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
      <div className='room-details-container'>
        <img src={room.img_url} alt={room.name} />
        <div className='room-details-info'>
          <article>
            <h3>Details:</h3>
            <p>{room.description}</p>
          </article>
          <article className='info'>
            <h3>Information:</h3>
            <h6>Price: ${room.price}</h6>
            <h6>Size: {room.size} Sq. feet</h6>
            <h6>Max capacity: {room.capacity} person(s)</h6>
            <h6>{room.breakfast ? 'Breakfast included' : 'No breakfast included'}</h6>
          </article>
        </div>        
      </div>
      <div className='room-extras'>
        <h6>Extras:</h6>
        {room.extras}
      </div>
      <button className='book-now-btn'>Book Now</button>
    </div>
  );
};

export default RoomDetails;
