import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateReservation.css';

const UpdateReservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/reservations/${id}`)
      .then(response => response.json())
      .then(data => {
        setReservation(data);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setNumGuests(data.num_guests);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();
    const data = { start_date: startDate, end_date: endDate, num_guests: numGuests };
    fetch(`/reservations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        setSuccess(true);
        alert('Reservation updated successfully!');
        navigate('/profile');
      })
      .catch(error => console.error(error))
  };

  return (
    <div className="update-reservation-container">
      {reservation ? (
        <div className="update-reservation-form">
          <h2 className="update-reservation-heading">Update Reservation</h2>
          {success && <p className="success-message">Reservation updated successfully</p>}
          <form onSubmit={handleSubmit}>
            <div className="update-reservation-input-container">
              <label htmlFor="start_date" className="update-reservation-label">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={event => setStartDate(event.target.value)}
                required
                className="update-reservation-input"
              />
            </div>
            <div className="update-reservation-input-container">
              <label htmlFor="end_date" className="update-reservation-label">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={event => setEndDate(event.target.value)}
                required
                className="update-reservation-input"
              />
            </div>
            <div className="update-reservation-input-container">
              <label htmlFor="num_guests" className="update-reservation-label">No. of Guests:</label>
              <input
                type="number"
                value={numGuests}
                onChange={event => setNumGuests(event.target.value)}
                required
                className="update-reservation-input"
              />
            </div>
            <button type="submit" className="update-reservation-button">Update Reservation</button>
          </form>
        </div>
      ) : (
        <p>Loading reservation details</p>
      )}
    </div>
  );
};

export default UpdateReservation;
