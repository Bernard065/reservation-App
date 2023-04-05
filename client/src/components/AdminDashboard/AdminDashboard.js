import React, { useState, useEffect } from 'react';
import AddRoom from '../AddRoom/AddRoom';
import AllReservations from '../AllReservations/AllReservations';
import './admin.css';

function FetchAllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/users', {
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong while fetching users.');
        }
      })
      .then(data => setUsers(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="container">
      <h1 className="title">All Users</h1>
      {error && <p className="error">{error}</p>}
      {!error && (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <AddRoom />
          <AllReservations />
        </>
      )}
    </div>
  );
}

export default FetchAllUsers;
