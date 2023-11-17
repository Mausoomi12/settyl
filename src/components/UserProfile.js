// UserProfile.js

import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api'; // Add this import

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        // Use the service function to get user profile data
        const userProfileData = await getUserProfile();

        // Update state with the received data
        setUserData(userProfileData);
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    // Call the fetchUserProfile function
    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          {/* Add more user-specific details as needed */}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
