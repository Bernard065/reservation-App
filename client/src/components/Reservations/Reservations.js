import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './reservations.css'

const Reservations = ({ user, room }) => {
  //const [room, setRoom] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numGuests, setNumGuests] = useState('')
  const [error, setError] = useState([]);
  
  const navigate = useNavigate();

  const handleBooking = async(event) => {
    event.preventDefault();
    const response = await fetch('/reservations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
        num_guests: numGuests,
        user_id: user.id,
        room_id: room.id,
      }),
    });
    const data = await response.json();
    //navigate("/my-reservations");
  
  }

  // if (!room) {
  //   return <p>Loading...</p>;
  // }
  
  return (
    <div className="reservation-container">
      <h1>Name: {room.name}</h1>
      <p>Description: {room.description}</p>
      <p>Price: ${room.price}</p>
      <form onSubmit={handleBooking}>
        <div className="reservation-date">
          <label className="reservation-label">Check-in Date:</label>
          <DatePicker className="reservation-input" selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div className="reservation-date">
          <label className="reservation-label">Check-out Date:</label>
          <DatePicker className="reservation-input" selected={endDate} onChange={date => setEndDate(date)} />
        </div>
        <div className="reservation-date">
          <label className="reservation-label">Number of Guests:</label>
          <input type="number" className="reservation-input" value={numGuests} onChange={e => setNumGuests(e.target.value)} />
        </div>
        <button className="reservation-button" type="submit">Book Now</button>
      </form>
    </div>
  )
}

export default Reservations
