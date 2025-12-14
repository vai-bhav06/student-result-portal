import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const roll = localStorage.getItem('studentRoll');
    if (roll) {
      const studentData = JSON.parse(localStorage.getItem(roll));
      setData(studentData);
    }
  }, []);

  const handleDownload = () => {
    html2canvas(printRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const y = 10;
      pdf.addImage(imgData, 'PNG', 5, y, pdfWidth - 10, pdfHeight);
      pdf.save(`${data.roll}_marksheet.pdf`);
    });
  };

  if (!data) return <p>⏳ Loading...</p>;

  return (
    <div className="dashboard">
      <div
        ref={printRef}
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '10px',
          maxWidth: '800px',
          margin: 'auto',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Logo and Title */}
        <div style={{ textAlign: 'center' }}>
          <img
            src="/logo.jpg"
            alt="Institute Logo"
            style={{ width: '80px', height: '80px', marginBottom: '10px' }}
          />
          <h1 style={{ margin: '0', color: '#2c3e50' }}>
          National Institute of Technology
          </h1>
          <p style={{ margin: '4px 0 20px 0' }}>Accredited by NAAC | Affiliated to XYZ University</p>
          <h2 style={{ marginBottom: '20px' }}>🎓 Student Marksheet</h2>
        </div>

        <hr style={{ margin: '10px 0' }} />

        {/* Student Info */}
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Roll Number:</strong> {data.roll}</p>
        <p><strong>Stream:</strong> {data.stream}</p>
        <p><strong>Semester:</strong> {data.semester}</p>

        {/* Subject Marks */}
        <h3>📚 Subject Marks</h3>
        <ul>
          {data.subjects.map(sub => (
            <li key={sub}>
              {sub}: {data.marks[sub]}
            </li>
          ))}
        </ul>

        {/* Summary */}
        <h3>🧮 Result Summary</h3>
        <p><strong>Total Marks:</strong> {data.total}</p>
        <p><strong>CGPA:</strong> {data.cgpa}</p>
        <p><strong>Grade:</strong> {data.grade}</p>
        <p><strong>Status:</strong> {data.status}</p>

        {/* Institute Stamp */}
        <img
          src="/stamp.png"
          alt="Institute Stamp"
          style={{
            width: '100px',
            opacity: 0.6,
            position: 'absolute',
            bottom: '20px',
            right: '20px'
          }}
        />
      </div>

      {/* Download Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleDownload}
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          📄 Download Marksheet (PDF)
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
