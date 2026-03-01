import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            alert("Access Denied!");
            navigate('/login');
        } else {
            fetchUsers();
        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/users/all-users');
            setUsers(res.data);
        } catch (err) {
            console.log("Error loading users");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:3000/api/users/delete-user/${id}`);
                alert("User removed!");
                fetchUsers();
            } catch (err) {
                alert("Action failed");
            }
        }
    };

    return (
        <div className="manage-users-container">
            <div className="manage-header">
                <h1>👥 Manage Registered Users</h1>
                <button className="back-btn" onClick={() => navigate('/admindashboard')}>
                    Back to Dashboard
                </button>
            </div>

            <div className="users-table-card">
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email Address</th>
                                <th>Current Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`role-tag ${user.role}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="action-cell">
                                            <button 
                                                className="delete-user-btn" 
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;