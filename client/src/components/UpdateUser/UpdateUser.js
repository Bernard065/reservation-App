import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './update.css'

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`/users/${id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();
    const data = { username, email, first_name: firstName, last_name: lastName };
    fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => setSuccess(true))
      .catch(error => console.log(error));
  };

  return (
    <div className='update-user'>
      {user ? (
        <div className="user-profile">
          <h2>User Profile</h2>
          {success && <p className="success-message">Updated successfully!</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" value={lastName} onChange={event => setLastName(event.target.value)} />
            </div>
            <button className="btn btn-primary" type="submit">Update</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateUser;
