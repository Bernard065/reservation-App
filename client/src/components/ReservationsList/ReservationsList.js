import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './reservation.css';

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/reservations', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReservations();
  }, []);

  const handleUpdateReservation = (reservation) => {
    navigate(`/reservations/${reservation.id}/edit`)
  };

  const handleDeleteReservation = async (reservation) => {
    try {
      const response = await fetch(`/reservations/${reservation.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        setReservations(reservations.filter(res => res.id !== reservation.id));
        setSelectedReservation(null);
      } else {
        throw new Error('Unable to delete reservation');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reservations-list">
      <h1>My Reservations</h1>
      {reservations && reservations.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>No. of Guests</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id} onClick={() => setSelectedReservation(reservation)} className={selectedReservation && selectedReservation.id === reservation.id ? "selected" : ""}>
                <td>{reservation.room.name}</td>
                <td>{reservation.start_date}</td>
                <td>{reservation.end_date}</td>
                <td>{reservation.num_guests}</td>
                <td>
                  <button className="btn-cancel" onClick={() => handleDeleteReservation(reservation)}>Cancel</button>
                </td>
                <td>
                  <button className="btn-update" onClick={() => handleUpdateReservation(reservation)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
};

export default ReservationsList;
