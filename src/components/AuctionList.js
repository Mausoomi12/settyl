import React, { useEffect, useState } from 'react';
import { getOngoingAuctions } from '../services/api';
import BidForm from './BidForm';


const AuctionList = () => {
  const [ongoingAuctions, setOngoingAuctions] = useState([]);

  useEffect(() => {
    const fetchOngoingAuctions = async () => {
      try {
        const auctions = await getOngoingAuctions();
        setOngoingAuctions(auctions);
      } catch (error) {
        console.error('Error fetching ongoing auctions:', error);
      }
    };

    fetchOngoingAuctions();
  }, []);

  return (
    <div>
      <h2>Ongoing Auctions</h2>
      {ongoingAuctions.map((auction) => (
  <div key={auction._id}>
    {/* Display auction details */}
    <h3>{auction.title}</h3>
    <p>Current Bid: ${auction.currentBid}</p>

    {/* Render the BidForm for placing bids */}
    <BidForm itemId={auction._id} currentBid={auction.currentBid} onBidPlaced={getOngoingAuctions} />
  </div>
))}
    </div>
  );
};

export default AuctionList;
