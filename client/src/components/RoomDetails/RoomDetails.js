import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import 'react-datepicker/dist/react-datepicker.css';
import './roomdetails.css';

const RoomDetails = ({ user, room, setRoom }) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/rooms/${id}`)
      .then(response => response.json())
      .then(setRoom);

  }, [id, setRoom]);

  const handleBookNowClick = () => {
    if (!user){
      setErrorMessage("You must be logged in to make a reservation")
      return
    }
    navigate('/reservations');
  };

  if (!room) {
    return (
      <div>
        <Header />
        <p>Loading room details...</p>
      </div>
    );
  }

  return (
    <div className='room-details-page'>
      <Header />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
        <button className='book-now-btn' onClick={handleBookNowClick}>Book Now</button>     
      </div>
    </div>
  );
};

export default RoomDetails;
