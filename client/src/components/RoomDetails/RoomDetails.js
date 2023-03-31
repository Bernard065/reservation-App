import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './roomdetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [booking, setBooking] = useState({
    room: null,
    checkInDate: null,
    checkOutDate: null,
  });
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    fetch(`/rooms/${id}`)
      .then(response => response.json())
      .then(setRoom);
  }, [id]);

  const handleBookRoom = (room) => {
    setBooking({
      room: room,
      checkInDate: null,
      checkOutDate: null,
    });
  }

  const handleCheckInChange = (date) => {
    setBooking({
      ...booking,
      checkInDate: date,
    });
  }

  const handleCheckOutChange = (date) => {
    setBooking({
      ...booking,
      checkOutDate: date,
    });
  }

  const handleBookRoomSubmit = (e) => {
    e.preventDefault();
    // Send reservation request to server with booking details
    console.log('Booking details:', booking);
  }

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
        <div className='image'>
          <img src={room.img_url} alt={room.name} />
          <img src={room.img_url} alt={room.name} />
        </div>
        
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
            <h6 className='extras'>Extras:</h6>
            {room.extras}
          </article>
        </div>        
      </div>
     
      <button className='book-now-btn'>Book Now</button>
    </div>
  );
};

export default RoomDetails;
