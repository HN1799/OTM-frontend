import React, { useState } from 'react';
import './ViewResults.css'; // Import a CSS file for styling

const ViewResults = () => {
    const [studentId, setStudentId] = useState('');
    const [results, setResults] = useState([]);
    const [average, setAverage] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/admin/results?rollNumber=${studentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }
            return response.json();
        })
        .then(data => {
            // Assuming `data` is the results array
            setResults(data);
            calculateAverage(data);
        })
        .catch(error => {
            setError(`Error: ${error.message}`);
            setResults([]);
            setAverage(null);
        });
    };

    const calculateAverage = (results) => {
        if (results.length === 0) return;
        const totalScore = results.reduce((acc, result) => acc + result.score, 0);
        const avg = (totalScore / results.length).toFixed(2); // Rounded to 2 decimal places
        setAverage(avg);
    };

    return (
        <div className="container">
            <h1>View Results</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="studentId">Student ID:</label>
                <input
                    type="text"
                    id="studentId"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    required
                /><br /><br />
                <button type="submit">View Results</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {average !== null && (
                <div>
                    <h2>Average Score</h2>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Average Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{average}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            {results.length > 0 && (
                <div>
                    <h2>Results</h2>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Test ID</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.student}</td>
                                    <td>{result.test}</td>
                                    <td>{result.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewResults;
