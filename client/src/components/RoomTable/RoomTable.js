import { useEffect, useState } from 'react';
import axios from 'axios';
import './RoomTable.css'

function RoomTable() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      const response = await axios.get('/rooms');
      setRooms(response.data);
    }
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/rooms/${id}`);
    setRooms(rooms.filter(room => room.id !== id));
  }

  return (
    <div className="room-table-container">
      <h2 className="room-table-title">All Rooms</h2>
      <table className="room-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Size</th>
            <th>Capacity</th>
            <th>Breakfast</th>
            <th>Featured</th>
            <th>Description</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.category}</td>
              <td>{room.price}</td>
              <td>{room.size}</td>
              <td>{room.capacity}</td>
              <td>{room.breakfast ? 'Yes' : 'No'}</td>
              <td>{room.featured ? 'Yes' : 'No'}</td>
              <td>{room.description}</td>
              <td>
                <button className='delete-button' onClick={() => handleDelete(room.id)}>Delete</button>
              </td>
              <td>
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomTable;
