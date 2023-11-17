// BidForm.js

import React, { useState } from 'react';
import { placeBid } from '../services/api';

const BidForm = ({ itemId, currentBid, onBidPlaced }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleBidAmountChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handlePlaceBid = async (event) => {
    event.preventDefault();

    // Validate bid amount
    if (!bidAmount || isNaN(parseFloat(bidAmount)) || parseFloat(bidAmount) <= currentBid) {
      alert('Bid amount must be a valid number and higher than the current bid.');
      return;
    }

    try {
      // Place bid using the service function
      await placeBid(itemId, bidAmount);

      // Notify parent component that bid has been placed
      onBidPlaced();

      // Clear bid amount
      setBidAmount('');
    } catch (error) {
      console.error('Error placing bid:', error.message);
      alert('Error placing bid. Please try again.');
    }
  };

  return (
    <form onSubmit={handlePlaceBid}>
      <label>
        Bid Amount:
        <input type="number" step="0.01" value={bidAmount} onChange={handleBidAmountChange} />
      </label>
      <button type="submit">Place Bid</button>
    </form>
  );
};

export default BidForm;
