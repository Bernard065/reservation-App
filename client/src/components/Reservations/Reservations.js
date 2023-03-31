import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './reservations.css'

const Reservations = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleBooking = (event) => {
    event.preventDefault();
    if (selectedRoom && startDate && endDate) {
      fetch('/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_id: selectedRoom.id,
          start_date: startDate,
          end_date: endDate
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('There was an error booking your reservation. Please try again.');
        }
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        setError(error.message)
      });
    };
  }

  // if (!room) {
  //   return <p>Loading...</p>;
  // }
  
  return (
    <div className="reservation-container">
      <form onSubmit={handleBooking}>
        <div className="reservation-date">
          <label className="reservation-label">Check-in Date:</label>
          <DatePicker className="reservation-input" selected={startDate} onChange={date => setStartDate(date)} />
        </div>
        <div className="reservation-date">
          <label className="reservation-label">Check-out Date:</label>
          <DatePicker className="reservation-input" selected={endDate} onChange={date => setEndDate(date)} />
        </div>
        <button className="reservation-button" type="submit">Book Now</button>
      </form>
    </div>
  )
}

export default Reservations
