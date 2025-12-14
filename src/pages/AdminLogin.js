import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') navigate('/admin-add-result');
    else alert('Invalid Admin Password');
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <input type="password" placeholder="Enter Admin Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="btn">Login</button>
    </div>
  );
};

export default AdminLogin;