import React, { useState, useEffect } from 'react';
import './AllReservations.css';

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/admin/reservations', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Error fetching reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reservations-container">
      <h1>All Reservations</h1>
      {error && <div className="error-message">{error}</div>}
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>User ID</th>
            <th>Room ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Number of Guests</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.user_id}</td>
              <td>{reservation.room_id}</td>
              <td>{reservation.start_date}</td>
              <td>{reservation.end_date}</td>
              <td>{reservation.num_guests}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllReservations;
