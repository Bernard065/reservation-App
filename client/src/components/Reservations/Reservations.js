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
  const [errors, setErrors] = useState([]);
  
  const navigate = useNavigate();

  const handleBooking = (event) => {
    event.preventDefault();
    fetch('/reservations',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room_id: room.id, start_date: startDate, end_date: endDate,num_guests: numGuests})
    })
      .then(response => {
        if (response.ok) {
          navigate('/');
          window.alert('Reservation made successfully!');
        } else {
          throw new Error('Unable to make a reservation');
        }
      })
      .catch(error => {
        setErrors([error.message])
      })
  }
  
  
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
      {errors.length > 0 && (
        <div className="reservation-errors">
          <ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Reservations
