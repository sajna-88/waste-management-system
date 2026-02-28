import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AdminDashboard = () => {
    const [allRequests, setAllRequests] = useState([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate(); 
    
    const [scheduleData, setScheduleData] = useState({
        area: '',
        day: 'Monday',
        time: '',
        collectorName: '',
        vehicleNumber: ''
    });

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            toast.error("Access Denied! Admins only."); 
            setTimeout(() => {
                navigate('/login'); 
            }, 2000); 
        } else {
            fetchAllRequests();
        }
    }, [navigate]);

    const fetchAllRequests = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/all-requests');
            setAllRequests(res.data);
        } catch (err) {
            console.error("Error fetching requests", err);
            toast.error("Failed to fetch requests!");
        }
    };

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            await axios.put('http://localhost:3000/api/users/update-status', { requestId, newStatus });
            toast.success("Status Updated Successfully!"); 
            fetchAllRequests(); 
        } catch (err) {
            toast.error("Update failed. Please try again."); 
        }
    };

    const handleScheduleChange = (e) => {
        setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
    };

    const handleScheduleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/users/add-schedule', scheduleData);
            toast.success("Schedule Added Successfully!"); 
            setScheduleData({ 
                area: '', day: 'Monday', time: '', collectorName: '', vehicleNumber: '' 
            });
            setTimeout(() => {
                navigate('/Sch');
            }, 1500);
        } catch (err) {
            toast.error("Failed to add schedule. Try again.");
        }
    };

    const openLogoutModal = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
    };

    const confirmLogout = () => {
        localStorage.clear();
        setShowLogoutModal(false);
        toast.info("Logging out..."); 
        setTimeout(() => {
            navigate('/login'); 
        }, 1500);
    };

    return (
        <div className="admin-container">
            <ToastContainer position="top-right" autoClose={3000} theme="colored"/>

            {/* Logout Modal Starts */}
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="logout-modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to logout?</p>
                        <div className="modal-buttons">
                            <button className="confirm-btn" onClick={confirmLogout}>Yes, Logout</button>
                            <button className="cancel-btn" onClick={closeLogoutModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Logout Modal Ends */}

            <header className="admin-header">
                <h2>Admin Panel - Waste Management</h2>
                <div className="header-btns">
                    <button className="profile-btn" onClick={() => navigate('/Pro')}>Profile</button>
                    <button className="manage-btn" onClick={() => navigate('/Man')}>Manage</button>
                    <button className="logout-btn" onClick={openLogoutModal}>Logout</button>
                </div>
            </header>

            <div className="admin-grid">
                <div className="admin-card schedule-section">
                    <h3>📅 Add Collection Timetable</h3>
                    <form className="schedule-form" onSubmit={handleScheduleSubmit}>
                        <input type="text" name="area" placeholder="Area Name" value={scheduleData.area} onChange={handleScheduleChange} required />
                        <select name="day" value={scheduleData.day} onChange={handleScheduleChange}>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                        <input type="text" name="time" placeholder="Time (e.g. 09:00 AM)" value={scheduleData.time} onChange={handleScheduleChange} required />
                        <input type="text" name="collectorName" placeholder="Collector Name" value={scheduleData.collectorName} onChange={handleScheduleChange} required />
                        <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={scheduleData.vehicleNumber} onChange={handleScheduleChange} required />
                        <button type="submit" className="add-schedule-btn">Add to Timetable</button>
                    </form>
                </div>

                <div className="admin-card request-section">
                    <h3>🚛 Recent Pickup Requests</h3>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Waste Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRequests.length > 0 ? (
                                    allRequests.map((req) => (
                                        <tr key={req._id}>
                                            <td>{req.username}</td>
                                            <td>{req.wasteType}</td>
                                            <td><span className={`status-${req.status.toLowerCase()}`}>{req.status}</span></td>
                                            <td>
                                                {req.status === "Pending" && (
                                                    <button className="collect-btn" onClick={() => handleStatusChange(req._id, "Collected")}>Collect</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4">No requests found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;