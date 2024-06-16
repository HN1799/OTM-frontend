import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <nav>
                <Link to="/create-test">Create Test</Link>
                <Link to="/assign-test">Assign Test</Link>
                <Link to="/view-results">View Results</Link>
                <Link to="/create-student">Create Student</Link>
                <Link to="/fetch-students">Fetch Students</Link>
            </nav>
        </div>
    );
};

export default AdminDashboard;
