import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(username, password);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <label>Username: </label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserRegistration;
