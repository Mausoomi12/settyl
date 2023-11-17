import React, { useState, useEffect } from 'react';
import { getAllListings, createListing } from '../services/api';

const ItemListing = () => {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({ title: '', description: '', price: '' });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getAllListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error.message);
      }
    };

    fetchListings();
  }, []);

  const handleInputChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const handleCreateListing = async () => {
    try {
      // Call the API function to create a new listing
      await createListing(newListing);
      // Fetch updated listings after creating a new one
      const updatedListings = await getAllListings();
      setListings(updatedListings);
      // Clear the input fields
      setNewListing({ title: '', description: '', price: '' });
    } catch (error) {
      console.error('Error creating listing:', error.message);
    }
  };

  return (
    <div>
      <h2>Item Listings</h2>

      {/* New Listing Form */}
      <div>
        <h3>Create a New Listing</h3>
        <label>Title: </label>
        <input type="text" name="title" value={newListing.title} onChange={handleInputChange} /><br />
        <label>Description: </label>
        <input type="text" name="description" value={newListing.description} onChange={handleInputChange} /><br />
        <label>Price: </label>
        <input type="text" name="price" value={newListing.price} onChange={handleInputChange} /><br />
        <button onClick={handleCreateListing}>Create Listing</button>
      </div>

      {/* Display Existing Listings */}
      <ul>
        {listings.map((item) => (
          <li key={item._id}>
            <strong>{item.title}</strong> - {item.description} (${item.price})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListing;
