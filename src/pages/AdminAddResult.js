import React, { useState } from 'react';
import subjectData from '../data/subjectData.json';

const AdminAddResult = () => {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [stream, setStream] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState({});
  const [result, setResult] = useState(null);

  const handleFetchSubjects = () => {
    if (stream && semester) {
      const subs = subjectData[stream]?.[semester] || [];
      setSubjects(subs);
      const initialMarks = {};
      subs.forEach(sub => (initialMarks[sub] = ''));
      setMarks(initialMarks);
    }
  };

  const handleMarkChange = (subject, value) => {
    setMarks({ ...marks, [subject]: value });
  };

  const handleCalculate = () => {
    const markValues = Object.values(marks).map(m => parseInt(m));
    if (markValues.some(isNaN)) return alert('❌ Please enter all marks correctly.');
    const total = markValues.reduce((acc, val) => acc + val, 0);
    const cgpa = (total / (markValues.length * 10)).toFixed(2);
    const grade = cgpa >= 8 ? 'A' : cgpa >= 6 ? 'B' : cgpa >= 5 ? 'C' : 'D';
    const status = markValues.every(m => m >= 35) ? 'Pass' : 'Fail';
    setResult({ total, cgpa, grade, status });
  };

  const handleSave = () => {
    if (!name || !roll || !stream || !semester || !result) return alert('⚠️ Please fill all details and calculate the result.');
    const record = { name, roll, stream, semester, subjects, marks, ...result };
    localStorage.setItem(roll, JSON.stringify(record));
    alert('✅ Result saved locally.');
    setName('');
    setRoll('');
    setStream('');
    setSemester('');
    setSubjects([]);
    setMarks({});
    setResult(null);
  };

  return (
    <div className="admin-form">
      <h2>📋 Admin: Add Student Result</h2>
      <input type="text" placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Roll Number" value={roll} onChange={e => setRoll(e.target.value)} />

      <select value={stream} onChange={e => setStream(e.target.value)}>
        <option value="">Select Stream</option>
        <option value="CSE">CSE</option>
        <option value="IT">IT</option>
        <option value="ECE">ECE</option>
        <option value="MECH">MECH</option>
        <option value="CIVIL">CIVIL</option>
        <option value="EE">EE</option>
      </select>

      <select value={semester} onChange={e => setSemester(e.target.value)}>
        <option value="">Select Semester</option>
        {[1, 2, 3, 4, 5, 6].map(sem => (
          <option key={sem} value={sem}>{`Semester ${sem}`}</option>
        ))}
      </select>

      <button onClick={handleFetchSubjects}>Fetch Subjects</button>

      {subjects.length > 0 && (
        <div>
          <h4>Enter Marks</h4>
          {subjects.map(subject => (
            <div key={subject}>
              {subject}: <input
                type="number"
                value={marks[subject] || ''}
                onChange={e => handleMarkChange(subject, e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleCalculate}>Calculate Result</button>
        </div>
      )}

      {result && (
        <div className="result-summary">
          <p><b>Total:</b> {result.total}</p>
          <p><b>CGPA:</b> {result.cgpa}</p>
          <p><b>Grade:</b> {result.grade}</p>
          <p><b>Status:</b> {result.status}</p>
          <button onClick={handleSave}>Save Result</button>
        </div>
      )}
    </div>
  );
};

export default AdminAddResult;
