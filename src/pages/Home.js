import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => (
  <div className="container home-container">
    <header className="header">
      <h1 className="title">🎓 Student Result Portal</h1>
      <p className="subtitle">Access your academic performance or manage student results securely</p>
    </header>

    <section className="institute-info">
      <h3>🏫 Institute Name: National Institute of Technology</h3>
      <p>📍 Address: XYZ Road, City, State, 123456</p>
      <p>📞 Contact: +91-12345-67890 | ✉️ info@nit.edu</p>
    </section>

    <section className="button-group">
      <Link to="/student-login" className="btn">👨‍🎓 Student Login</Link>
      <Link to="/admin-login" className="btn">🛠️ Admin Login</Link>
    </section>

    
  </div>
);

export default Home;