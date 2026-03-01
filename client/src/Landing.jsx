import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-wrapper">
            <nav className="navbar">
                <div className="logo">♻️ EcoWaste</div>
                <ul className="nav-links">
                    <li><a href="#home"><Link to="/Lan">Home</Link></a></li>
                    <li><a href="#about"><Link to="/Abo">About</Link></a></li>
                    <li><a href="#services"><Link to="/Con">Contact</Link></a></li>
                    <li><button className="nav-btn"><Link to ="/login">Login</Link></button></li>
                    <li><button className="nav-btn"><Link to="/Reg">Register</Link></button></li>
                </ul>
            </nav>

            <header className="hero-section" id="home">
                <div className="hero-content">
                    <h1>Clean Environment, <br /> <span>Green Future</span></h1>
                    <p>
                        Join our mission to create a sustainable world. We provide efficient 
                        waste collection and recycling solutions for a cleaner tomorrow.
                    </p>
                    <div className="hero-btns">
                        <button className="primary-btn">Report Waste</button>
                        <button className="secondary-btn">Learn More</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://cdn-icons-png.flaticon.com/512/3299/3299935.png" alt="Eco Illustration" />
                </div>
            </header>
           

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 EcoWaste Management. All rights reserved.</p>
                    <div className="socials">
                        <span>Facebook</span> | <span>Twitter</span> | <span>Instagram</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;