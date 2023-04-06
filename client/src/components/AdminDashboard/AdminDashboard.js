import React, { useState, useEffect } from 'react';
import AddRoom from '../AddRoom/AddRoom';
import AllReservations from '../AllReservations/AllReservations';
import Footer from '../Footer/Footer';
import RoomTable from '../RoomTable/RoomTable';
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

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        throw new Error('Something went wrong while deleting the user.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">All Users</h1>
        {error && <p className="error">{error}</p>}
        {!error && (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <AddRoom />
            <AllReservations />
            <RoomTable />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default FetchAllUsers;
