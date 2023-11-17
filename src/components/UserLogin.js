import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token } = await loginUser(username, password);
      // Store the token in localStorage or global state
      localStorage.setItem('token', token);
      // Redirect to the home page or another route
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <label>Username: </label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
