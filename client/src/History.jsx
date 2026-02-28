import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
    const [requests, setRequests] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/users/my-requests/${userId}`);
                setRequests(res.data);
            } catch (err) {
                console.error("Error loading history");
            }
        };
        if (userId) fetchHistory();
    }, [userId]);

    return (
        <div className="history-page-container">
            <div className="history-header">
                <h1>📋 Collection History & Tracking</h1>
                <p>Track the status of your waste pickup requests here.</p>
            </div>

            <div className="history-list">
                {requests.length > 0 ? (
                    requests.map((req) => (
                        <div key={req._id} className="history-card">
                            <div className="card-top">
                                <span className="waste-type-tag">{req.wasteType}</span>
                                <span className={`status-badge ${req.status.toLowerCase()}`}>
                                    {req.status}
                                </span>
                            </div>
                            <div className="card-body">
                                <p><strong>📍 Address:</strong> {req.address}</p>
                                <p><strong>📅 Date:</strong> {new Date(req.date).toLocaleDateString()}</p>
                            </div>
                            <div className="tracking-timeline">
                                <div className={`step ${req.status === 'Pending' || req.status === 'Collected' ? 'active' : ''}`}>
                                    <div className="dot"></div>
                                    <p>Request Sent</p>
                                </div>
                                <div className={`step ${req.status === 'Collected' ? 'active' : ''}`}>
                                    <div className="dot"></div>
                                    <p>Collected</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-data">
                        <h3>No history found.</h3>
                        <button onClick={() => window.location.href='/userdashboard'}>Make a Request</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;