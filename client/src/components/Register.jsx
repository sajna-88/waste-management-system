import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '', 
        email: '',
        password: '',
        role: 'user'
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setError(passwordError);
            return; 
        }

        try {
            console.log("Sending data:", formData); 
            const response = await axios.post('http://localhost:3000/api/users/register', formData);
            
            console.log("Response:", response.data); 

            if (response.status === 200 || response.status === 201) {
                toast.success("Registration Successful! Redirecting to login...");
                
                setTimeout(()=>{
                navigate('/login'); 

                },2000)
            }

        } catch (error) {
            console.error("Register Error:", error.response || error);
            toast.error(error.response?.data?.message || "Registration Failed. Try again.");
        }
    };

    return (
        <div className="register-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Waste Management - Sign Up</h2>
                
                <div className="form-group">
                    <input type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>

                {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '10px' }}>{error}</p>}

                <button type="submit" className="register-btn">Register</button>
                
                <p className="login-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>

                <div className="back-to-login">
                    <Link to="/login">Back to Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;