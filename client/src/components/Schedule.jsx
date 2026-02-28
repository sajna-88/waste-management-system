import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/users/get-schedules');
                setSchedules(res.data);
            } catch (err) {
                console.error("Error fetching schedules", err);
            }
        };
        fetchSchedules();
    }, []);

    return (
        <div className="schedule-container">
            <div className="schedule-header">
                <h1>🚛 Waste Collection Timetable</h1>
                <button className="back-btn" onClick={() => navigate(-1)}>Back to Dashboard</button>
            </div>
            
            <div className="table-wrapper">
                {schedules.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Area</th>
                                <th>Day</th>
                                <th>Time</th>
                                <th>Collector</th>
                                <th>Vehicle No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((s) => (
                                <tr key={s._id}>
                                    <td>{s.area}</td>
                                    <td>{s.day}</td>
                                    <td><span className="time-chip">{s.time}</span></td>
                                    <td>{s.collectorName}</td>
                                    <td>{s.vehicleNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data">No schedules available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default Schedule;