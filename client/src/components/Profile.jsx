import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role'); 
    
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) {
                toast.error("User not found. Please login again.");
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3000/api/users/profile/${userId}`);
                setUserData({
                    username: res.data.username,
                    email: res.data.email,
                    password: res.data.password
                });
            } catch (err) {
                console.log("Error loading profile");
                toast.error("Failed to load profile data.");
            }
        };
        fetchProfile();
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/profile-update/${userId}`, userData);
            
            
            toast.success("Profile Updated Successfully!");
            
            localStorage.setItem('username', userData.username);

            
            setTimeout(() => {
                const dashboardPath = role === 'admin' ? '/admindashboard' : '/userdashboard';
                navigate(dashboardPath);
            }, 2000);

        } catch (err) {
            toast.error("Update Failed. Please try again.");
        }
    };

    const dashboardPath = role === 'admin' ? '/admindashboard' : '/userdashboard';

    return (
        <div className="profile-container">
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                theme="colored"
                style={{ zIndex: 99999 }}
            />

            <div className="profile-card">
                <h2>👤 My Profile</h2>
                <form onSubmit={handleUpdate}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            value={userData.username} 
                            onChange={(e) => setUserData({...userData, username: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            value={userData.email} 
                            onChange={(e) => setUserData({...userData, email: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={userData.password} 
                            onChange={(e) => setUserData({...userData, password: e.target.value})} 
                            required 
                        />
                    </div>
                    <button type="submit" className="update-btn">Save Changes</button>
                    
                    <div className="back-dashboard-container">
                        <Link to={dashboardPath} className="back-dashboard-link">
                            Back to Dashboard
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;