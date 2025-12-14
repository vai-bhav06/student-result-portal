import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const [roll, setRoll] = useState('');
  const [name, setName] = useState('');
  const [stream, setStream] = useState('');
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // 🛡️ Redirect if not admin
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isAdminLoggedIn !== 'true') {
      alert('Access denied! Admin only.');
      navigate('/admin-login');
    }
  }, [navigate]);

  // 📥 Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  // 📝 Register student
  const handleRegister = () => {
    if (!roll || !name || !stream) return alert('⚠️ Please fill all fields.');

    const newStudent = { roll, name, stream };
    const updated = [...students, newStudent];

    localStorage.setItem('students', JSON.stringify(updated));
    setStudents(updated);

    setRoll('');
    setName('');
    setStream('');
    alert('✅ Student registered successfully!');
  };

  // ❌ Delete student
  const handleDelete = (rollToDelete) => {
    const updated = students.filter((s) => s.roll !== rollToDelete);
    localStorage.setItem('students', JSON.stringify(updated));
    setStudents(updated);
  };

  // 🔍 Filtered students
  const filteredStudents = students.filter(
    (s) =>
      s.roll.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container register-container">
      <h2>📝 Student Registration</h2>

      <input
        type="text"
        placeholder="Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={stream} onChange={(e) => setStream(e.target.value)}>
        <option value="">-- Select Stream --</option>
        <option value="CSE">Computer Science (CSE)</option>
        <option value="IT">Information Technology (IT)</option>
        <option value="ECE">Electronics (ECE)</option>
        <option value="ME">Mechanical (ME)</option>
        <option value="CIVIL">Civil Engineering</option>
        <option value="EEE">Electrical (EEE)</option>
      </select>

      <button onClick={handleRegister} className="btn">Register Student</button>

      <hr />

      <h3>📋 Registered Students</h3>
      <input
        type="text"
        placeholder="Search by Roll or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <li key={index}>
              {student.roll} - {student.name} ({student.stream})
              <button
                onClick={() => handleDelete(student.roll)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                ❌ Delete
              </button>
            </li>
          ))
        ) : (
          <li>No students found.</li>
        )}
      </ul>
    </div>
  );
};

export default StudentRegister;
