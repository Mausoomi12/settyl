const express = require('express');
const http = require('http');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Include WebSocket routes
const { router: auctionsRouter, initializeWebSocket } = require('./routes/auctions');

// Initialize WebSocket connection
initializeWebSocket(wss);

const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb+srv://priyanshu:priyanshu@cluster0.uxgyobo.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Your User model
const User = require('./models/User');
// Your Item model
const Item = require('./models/Item');
const authenticateToken = require('./middlewares/authenticateToken');

// JWT Secret Key
const secretKey = '9f7b2dd08c7616164dbb08928cf648cd629911ae8bc65809f8ce91d8ca3301dc';

// Use the auctions route
app.use('/auctions', auctionsRouter);

// User Registration Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Item Listing Routes

// Create Item Listing
app.post('/listings', authenticateToken, async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const newItem = new Item({
      title,
      description,
      price,
      seller: req.user.userId, // Associate the listing with the user
    });

    await newItem.save();

    res.status(201).json({ message: 'Item listed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get All Item Listings
app.get('/listings', async (req, res) => {
  try {
    const listings = await Item.find().populate('seller', 'username'); // Populate the seller field with username

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/auctions/ongoing', async (req, res) => {
  try {
    // You need to implement logic here to retrieve ongoing auctions
    // For example, you can find items with an active auction status
    const ongoingAuctions = await Item.find({ status: 'active' }).populate('seller', 'username');

    res.status(200).json(ongoingAuctions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Single Item Listing
app.get('/listings/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    const listing = await Item.findById(itemId).populate('seller', 'username');

    if (!listing) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update Item Listing
app.put('/listings/:itemId', authenticateToken, async (req, res) => {
  const { itemId } = req.params;
  const { title, description, price } = req.body;

  try {
    const listing = await Item.findById(itemId);

    if (!listing) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the user owns the listing
    if (listing.seller.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    listing.title = title;
    listing.description = description;
    listing.price = price;

    await listing.save();

    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete Item Listing
app.delete('/listings/:itemId', authenticateToken, async (req, res) => {
  const { itemId } = req.params;

  try {
    const listing = await Item.findById(itemId);

    if (!listing) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the user owns the listing
    if (listing.seller.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await listing.deleteOne();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
