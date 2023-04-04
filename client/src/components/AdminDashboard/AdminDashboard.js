import { useState, useEffect } from 'react';
import AddRoom from '../AddRoom/AddRoom';
import AllReservations from '../AllReservations/AllReservations';
import './admin.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1 className="title">All Users</h1>
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
    </div>
  );
}

export default AdminDashboard;
