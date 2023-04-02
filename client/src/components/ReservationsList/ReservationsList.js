import React, { useEffect, useState } from 'react';
import './reservation.css'

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('/reservations')
      .then(response => response.json())
      .then(data => {
        setReservations(data.reservations);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.room.name}</td>
                <td>{reservation.start_date}</td>
                <td>{reservation.end_date}</td>
                <td>
                  <button className="btn-cancel">Cancel</button>
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
