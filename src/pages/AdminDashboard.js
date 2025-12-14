// pages/AdminDashboard.js
import React, { useState } from 'react';

const AdminDashboard = () => {
  const [student, setStudent] = useState({
    roll: '',
    name: '',
    password: '',
    stream: '',
    semester: '',
    cgpa: '',
    subjects: [{ name: '', marks: '', grade: '' }],
  });

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...student.subjects];
    updatedSubjects[index][field] = value;
    setStudent({ ...student, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setStudent({
      ...student,
      subjects: [...student.subjects, { name: '', marks: '', grade: '' }],
    });
  };

  const handleSubmit = () => {
    if (!student.roll || !student.password) {
      alert('Roll and Password are required');
      return;
    }
    localStorage.setItem(student.roll, JSON.stringify(student));
    alert('Student result uploaded!');
    setStudent({
      roll: '',
      name: '',
      password: '',
      stream: '',
      semester: '',
      cgpa: '',
      subjects: [{ name: '', marks: '', grade: '' }],
    });
  };

  return (
    <div className="container">
      <h2>🛠️ Admin Dashboard - Upload Student Result</h2>

      <input type="text" placeholder="Roll Number" value={student.roll} onChange={e => setStudent({ ...student, roll: e.target.value })} />
      <input type="text" placeholder="Name" value={student.name} onChange={e => setStudent({ ...student, name: e.target.value })} />
      <input type="password" placeholder="Password" value={student.password} onChange={e => setStudent({ ...student, password: e.target.value })} />
      <input type="text" placeholder="Stream (e.g. CSE)" value={student.stream} onChange={e => setStudent({ ...student, stream: e.target.value })} />
      <input type="text" placeholder="Semester" value={student.semester} onChange={e => setStudent({ ...student, semester: e.target.value })} />
      <input type="text" placeholder="CGPA" value={student.cgpa} onChange={e => setStudent({ ...student, cgpa: e.target.value })} />

      <h4>Subjects:</h4>
      {student.subjects.map((subj, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Subject Name"
            value={subj.name}
            onChange={e => handleSubjectChange(index, 'name', e.target.value)}
          />
          <input
            type="number"
            placeholder="Marks"
            value={subj.marks}
            onChange={e => handleSubjectChange(index, 'marks', e.target.value)}
          />
          <input
            type="text"
            placeholder="Grade"
            value={subj.grade}
            onChange={e => handleSubjectChange(index, 'grade', e.target.value)}
          />
        </div>
      ))}

      <button onClick={addSubject} className="btn">➕ Add Another Subject</button>
      <br /><br />
      <button onClick={handleSubmit} className="btn">📤 Submit Result</button>
    </div>
  );
};

export default AdminDashboard;
