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

    const [errors, setErrors] = useState([]);

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
        try {
            const response = await fetch('rooms', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Room added successfully!');
            } else {
                setErrors(data.errors);
            }
        } catch (error) {
            setErrors(['An error occurred. Please try again.']);
        }
    };
    

    return (
        <div className='add-room'>
            <h1>Add Room</h1>
            {errors.length > 0 && (
                <div className='errors'>
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
                        required
                        className='input-field'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className='input-field'
                    />
                </div>
                <div className='form-group'> 
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        className='input-field'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="size">Size:</label>
                    <input
                        type="number"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                        min="0"
                        className='input-field'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        min="0"
                        className='input-field'
                    />
                    <div className='form-group-helper'>
                        <small>Enter the maximum number of people this room can accommodate.</small>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description:</label>
                    <textarea
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className='input-field'
                    >
                        
                    </textarea>
                    <div className='form-group-helper'>
                        <small>Provide a brief description of the room.</small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="extras" className="label-field">Extras:</label>
                    <textarea
                        id="extras"
                        name="extras"
                        value={formData.extras}
                        onChange={handleChange}
                        className="input-field textarea-field"
                    >
                    </textarea>
                    <div className="form-group-helper">
                        <small>Enter comma-separated list of additional features and amenities of the room (e.g. Wi-Fi, TV, air conditioning).</small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="img_url" className="label-field">Image URL:</label>
                    <input
                        type="text"
                        id="img_url"
                        name="img_url"
                        value={formData.img_url}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <div className="form-group-helper">
                        <small>Enter the URL of an image for this room.</small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="breakfast" className="checkbox-label">
                    <input
                        type="checkbox"
                        id="breakfast"
                        name="breakfast"
                        checked={formData.breakfast}
                        onChange={handleChange}
                        className='checkbox-field'
                    />
                    <span className="label-text">Breakfast</span>
                    </label>
                    <div className="form-group-helper">
                        <small>Select if breakfast is included with this room.</small>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor="featured" className="checkbox-label">
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className='checkbox-field'
                    />
                    <span className="label-text">Featured</span>
                    </label>
                    <div className="form-group-helper">
                        <small>Select if this room should be featured on the home page.</small>
                    </div>
                </div>
                <div>
                    <button type='submit' className='submit-button'>Add</button>
                </div>
            </form>
        </div>
    )
}
export default AddRoom;                                  
