import React, { useState } from 'react';

const ViewResults = () => {
    const [studentId, setStudentId] = useState('');
    const [results, setResults] = useState([]);
    const [average, setAverage] = useState(null);
    const [result, setResult] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/admin/student/${studentId}/results`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }
            return response.json();
        })
        .then(data => {
            setResults(data.results);
            setAverage(data.average);
        })
        .catch(error => {
            setResult(`Error: ${error.message}`);
        });
    };

    return (
        <div className="container">
            <h1>View Results</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="studentId">Student ID:</label>
                <input type="text" id="studentId" value={studentId} onChange={e => setStudentId(e.target.value)} required /><br /><br />
                <button type="submit">View Results</button>
            </form>
            {average !== null && (
                <div>
                    <h2>Average Score: {average}</h2>
                </div>
            )}
            {results.length > 0 && (
                <div>
                    <h2>Results:</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                Test ID: {result.testId}, Score: {result.score}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>{result}</div>
        </div>
    );
};

export default ViewResults;
