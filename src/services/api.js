// services/api.js
const BASE_URL = 'http://localhost:3001'; // Update this URL based on your backend server

const headers = {
  'Content-Type': 'application/json',
};

// Fetch ongoing auctions
export const getOngoingAuctions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auctions/ongoing`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Place a bid on an auction
export const placeBid = async (itemId, bidAmount) => {
  try {
    const token = localStorage.getItem('token'); // Assuming you store the user token in localStorage
    const response = await fetch(`${BASE_URL}/auctions/bid/${itemId}`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bidAmount }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the user token in localStorage
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // Fetch user transaction history
  export const getTransactionHistory = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the user token in localStorage
      const response = await fetch(`${BASE_URL}/user/transactions`, {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // User Registration
export const registerUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // User Login
  export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // Get All Item Listings
  export const getAllListings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/listings`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  // Create a new item listing
  export const createListing = async (newListing) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the user token in localStorage
      const response = await fetch(`${BASE_URL}/listings`, {
        method: 'POST',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newListing),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  

// Add more service functions as needed for user-related operations, etc.
