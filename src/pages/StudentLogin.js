import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [roll, setRoll] = useState('');
  const [name, setName] = useState('');
  const [stream, setStream] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const data = JSON.parse(localStorage.getItem(roll));

    if (
      data &&
      data.name.toLowerCase() === name.toLowerCase() &&
      data.stream.toLowerCase() === stream.toLowerCase()
    ) {
      localStorage.setItem('studentRoll', roll);
      navigate('/student-dashboard');
    } else {
      alert('❌ Invalid Roll Number, Name, or Stream');
    }
  };

  return (
    <div className="login-container">
      <h2>🎓 Student Login</h2>

      <input
        type="text"
        placeholder="Enter Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Roll Number"
        value={roll}
        onChange={e => setRoll(e.target.value)}
      />

      

      <select
        value={stream}
        onChange={e => setStream(e.target.value)}
      >
        <option value="">Select Stream</option>
        <option value="CSE">CSE</option>
        <option value="IT">IT</option>
        <option value="ECE">ECE</option>
        <option value="EE">EE</option>
        <option value="ME">ME</option>
        <option value="CE">CE</option>
      </select>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default StudentLogin;
