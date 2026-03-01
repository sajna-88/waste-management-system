import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
    const navigate = useNavigate(); 
    
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    const [wasteType, setWasteType] = useState('Organic');
    const [address, setAddress] = useState('');
    const [requests, setRequests] = useState([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const fetchRequests = async () => {
        if (!userId || userId === "undefined") return;
        try {
            const res = await axios.get(`http://localhost:3000/api/users/my-requests/${userId}`);
            setRequests(res.data);
        } catch (err) {
            console.error("Error fetching requests:", err);
            toast.error("Failed to load request history");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || userId === "undefined") {
            toast.error("Session expired! Please login again.");
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        try {
            const requestData = { userId, username, wasteType, address };
            await axios.post('http://localhost:3000/api/users/request-waste', requestData);
            toast.success("Pickup request submitted successfully!");
            setTimeout(() => {
                setAddress('');
                fetchRequests(); 
            }, 1500);
        } catch (err) {
            toast.error("Failed to send request.");
        }
    };

    const handleLogoutClick = () => setShowLogoutModal(true);
    const closeLogoutModal = () => setShowLogoutModal(false);

    const confirmLogout = () => {
        localStorage.clear();
        setShowLogoutModal(false);
        toast.info("Logged out successfully!");
        setTimeout(() => navigate('/login'), 1500);
    };

    return (
        <div className="dashboard-container">
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="logout-modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to exit?</p>
                        <div className="modal-buttons">
                            <button className="confirm-btn" onClick={confirmLogout}>Yes, Logout</button>
                            <button className="cancel-btn" onClick={closeLogoutModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <header className="dashboard-header">
                <h2>Welcome, {username || "User"}!</h2>
                <div className="header-actions">
                    <button className="schedule-btn" onClick={() => navigate('/Sch')}>
                        Schedule
                    </button>
                    <button className="history-btn" onClick={() => navigate('/His')}>
                        History
                    </button>
                    <button className="logout-btn" onClick={handleLogoutClick}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-grid">
                <div className="request-box">
                    <h3>Request Waste Pickup</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Waste Type:</label>
                        <select value={wasteType} onChange={(e) => setWasteType(e.target.value)}>
                            <option value="Organic">Organic (Food/Green)</option>
                            <option value="Plastic">Plastic/Paper</option>
                            <option value="E-waste">E-waste</option>
                            <option value="Glass">Glass Items</option>
                        </select>
                        <label>Pickup Address:</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Enter location"></textarea>
                        <button type="submit" className="submit-btn">Submit Request</button>
                    </form>
                </div>

                <div className="history-box">
                    <h3>Recent Pickup History</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr><th>Type</th><th>Status</th><th>Date</th></tr>
                            </thead>
                            <tbody>
                                {requests.slice(0, 5).map((req) => (
                                    <tr key={req._id}>
                                        <td>{req.wasteType}</td>
                                        <td><span className={`status-badge status-${req.status.toLowerCase()}`}>{req.status}</span></td>
                                        <td>{new Date(req.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;