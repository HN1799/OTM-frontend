import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    return (
        <div className="container">
            <h1>Student Dashboard</h1>
            <nav>
                <Link to="/take-test">Take Test</Link>
                <Link to="/view-results">View Results</Link>
                <Link to="/create-student">Register</Link>
                <Link to="/view-test">Veiw Test</Link>
            </nav>
        </div>
    );
};

export default StudentDashboard;
