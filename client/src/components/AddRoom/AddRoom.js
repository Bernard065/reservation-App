import React, { useState } from 'react'
import './AddRoom.css'

const AddRoom = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        size: '',
        capacity: '',
        breakfast: false,
        featured: false,
        description: '',
        extras: ''
    })

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        setFormData({
          ...formData,
          [name]: value
        });
    };
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('rooms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            alert('Room added successfully!');
        } else {
          // handle error
          setErrors(data.errors);
        }
    };
    

  return (
    <div className='add-room'>
        <h1>Add Room</h1>
        {errors.length > 0 && (
            <div>
                <h2>Errors:</h2>
                <ul>
                    {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                    ))}
                </ul>
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                r   equired
                />
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div>
                <label htmlFor="size">Size:</label>
                <input
                    type="number"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div>
                <label htmlFor="capacity">Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div>
                <label htmlFor="breakfast">Breakfast:</label>
                <input
                    type="checkbox"
                    id="breakfast"
                    name="breakfast"
                    checked={formData.breakfast}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="featured">Featured:</label>
                <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required>    
                </textarea>
            </div>
            <div>
                <label htmlFor="extras">Extras:</label>
                <textarea
                    id="extras"
                    name="extras"
                    value={formData.extras}
                    onChange={handleChange}>
                </textarea>
            </div>
            <div>
                <label htmlFor="img_url">Image URL:</label>
                <input
                    type="text"
                    id="img_url"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    </div>
  )
}

export default AddRoom