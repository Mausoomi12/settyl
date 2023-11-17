// routes/auctions.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');

// Your Item model
const Item = require('../models/Item');

// WebSocket instance (to be passed from server.js)
let wss;

// Initialize WebSocket connection
function initializeWebSocket(webSocketServer) {
  wss = webSocketServer;
}

// Route to get ongoing auctions
router.get('/ongoing', async (req, res) => {
  try {
    // Retrieve ongoing auctions (you can customize this query based on your requirements)
    const ongoingAuctions = await Item.find({
      // Add conditions for ongoing auctions (e.g., where end time > current time)
      // ...
    }).populate('seller', 'username');

    res.status(200).json(ongoingAuctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to place a bid on an auction
router.post('/bid/:itemId', authenticateToken, async (req, res) => {
  const { itemId } = req.params;
  const { bidAmount } = req.body;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the auction is ongoing (you can customize this check based on your requirements)
    // ...

    // Check if the bid amount is greater than the current highest bid (you can customize this logic)
    if (bidAmount > item.currentBid) {
      // Update the item's currentBid and bidder fields
      item.currentBid = bidAmount;
      item.bidder = req.user.userId;

      await item.save();

      // Broadcast the bid to all connected clients
      if (wss) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'bid',
              itemId,
              username: req.user.username,
              bidAmount,
            }));
          }
        });
      }

      res.status(200).json({ message: 'Bid placed successfully' });
    } else {
      res.status(400).json({ message: 'Bid amount must be higher than the current highest bid' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { router, initializeWebSocket };
