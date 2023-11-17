import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuctionList from './components/AuctionList';
import BidForm from './components/BidForm';
import UserProfile from './components/UserProfile';
import TransactionHistory from './components/TransactionHistory';
import UserRegisteration from './components/UserRegistration'; // Add this import
import UserLogin from './components/UserLogin'; // Add this import
import ItemListing from './components/ItemListing'; // Add this import


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auctions" element={<AuctionList />} />
        <Route path="/bid/:auctionId" element={<BidForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/register" element={<UserRegisteration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/listings" element={<ItemListing />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
