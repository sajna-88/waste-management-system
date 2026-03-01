import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-wrapper">
            <nav className="navbar">
                <div className="logo">♻️ EcoWaste</div>
                <ul className="nav-links">
                    <li><Link to="/Lan">Home</Link></li>
                    <li><Link to="/Abo">About</Link></li>
                    <li><Link to="/Con">Contact</Link></li>
                    <li>
                        <Link to="/login">
                            <button className="nav-btn">Login</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Reg">
                            <button className="nav-btn">Register</button>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="about-hero">
                <h1>About Our <span>Mission</span></h1>
                <p>Leading the way towards a cleaner, greener, and more sustainable future.</p>
            </div>

            <div className="about-content">
                <div className="about-card">
                    <div className="card-icon">🎯</div>
                    <h3>Our Mission</h3>
                    <p>
                        To revolutionize waste management through smart technology, 
                        ensuring efficient collection and maximum recycling to protect our environment.
                    </p>
                </div>

                <div className="about-card">
                    <div className="card-icon">👁️‍🗨️</div>
                    <h3>Our Vision</h3>
                    <p>
                        A world where waste is seen as a resource. We aim to achieve 
                        zero-waste communities through public participation and innovative solutions.
                    </p>
                </div>
            </div>

            <div className="about-details">
                <div className="details-text">
                    <h2>Why This System Matters?</h2>
                    <p>
                        Managing waste is one of the biggest challenges of our century. 
                        Our system bridges the gap between citizens and waste management authorities.
                    </p>
                    <ul className="details-list">
                        <li>🌱 <strong>Eco-Friendly:</strong> Focused on reducing carbon footprint.</li>
                        <li>🚛 <strong>Efficient Tracking:</strong> Smart scheduling for waste collection.</li>
                        <li>♻️ <strong>Recycling First:</strong> Promoting waste segregation at the source.</li>
                        <li>📱 <strong>Digital Access:</strong> Easy reporting and monitoring for every citizen.</li>
                    </ul>
                </div>
                <div className="details-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/3299/3299935.png" alt="Eco Management" />
                </div>
            </div>

            {/* Statistics Section */}
            <div className="about-stats">
                <div className="stat-item">
                    <h4>10k+</h4>
                    <p>Houses Served</p>
                </div>
                <div className="stat-item">
                    <h4>50+</h4>
                    <p>Collection Vans</p>
                </div>
                <div className="stat-item">
                    <h4>100%</h4>
                    <p>Eco Friendly</p>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 EcoWaste Management. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default About;