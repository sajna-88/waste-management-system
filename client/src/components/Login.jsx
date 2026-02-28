import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setError('');
    };

    const validatePassword = (password) => {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (password.length < minLength) return "Password must be at least 6 characters long.";
        if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
        if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
        if (!hasNumber) return "Password must contain at least one number.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordError = validatePassword(loginData.password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/users/login', loginData);
            const { userId, username, role } = response.data;

            localStorage.setItem('userId', userId);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);

            
            toast.success(`Welcome ${username}! Logged in as ${role}`);

            setTimeout(() => {
                if (role === 'admin') {
                    navigate('/admindashboard');
                } else {
                    navigate('/userdashboard');
                }
            }, 2000); 

        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="login-container">
            <ToastContainer position="top-right" autoClose={2000} />
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Waste Management - Login</h2>
                
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" placeholder="Enter your email" value={loginData.email} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your password" value={loginData.password} onChange={handleChange} required />
                </div>

                {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}

                <button type="submit" className="login-btn">Login</button>
                
                <p className="register-link">
                    Don't have an account? <Link to="/Reg">Sign Up</Link>
                </p>

                <div className="back-to-home">
                    <Link to="/Lan">Back to Home</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;