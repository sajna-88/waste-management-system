import React from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="contact-wrapper">
            {/* Navbar (Landing page-ൽ ഉള്ളത് പോലെ തന്നെ) */}
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

            {/* Header Section */}
            <div className="contact-header">
                <h1>Contact Us</h1>
                <p>Have questions? Provide your email and we'll reach out to you!</p>
            </div>

            {/* Info Cards Section */}
            <div className="contact-cards-container">
                <div className="info-card">
                    <div className="icon-box">
                        <span role="img" aria-label="location">📍</span>
                    </div>
                    <h3>Our Location</h3>
                    <p>EcoWaste Plaza, Green Valley, Kerala, India</p>
                </div>

                <div className="info-card">
                    <div className="icon-box">
                        <span role="img" aria-label="phone">📞</span>
                    </div>
                    <h3>Call Us</h3>
                    <p>+91 98765 43210</p>
                </div>

                <div className="info-card">
                    <div className="icon-box">
                        <span role="img" aria-label="email">✉️</span>
                    </div>
                    <h3>Email Us</h3>
                    <p>support@ecowaste.com</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer" style={{marginTop: '50px'}}>
                <div className="footer-content">
                    <p>&copy; 2024 EcoWaste Management. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Contact;