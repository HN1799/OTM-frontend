import React, { useState } from 'react';

const AssignTest = () => {
    const [testId, setTestId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8080/api/admin/assignTest?testId=${testId}&studentId=${studentId}`, {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to assign test');
            }
            return response.text();
        })
        .then(data => {
            setResult(data);
        })
        .catch(error => {
            setResult(`Error: ${error.message}`);
        });
    };

    return (
        <div className="container">
            <h1>Assign Test</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="testId">Test ID:</label>
                <input type="text" id="testId" value={testId} onChange={e => setTestId(e.target.value)} required /><br /><br />
                <label htmlFor="studentId">Student ID:</label>
                <input type="text" id="studentId" value={studentId} onChange={e => setStudentId(e.target.value)} required /><br /><br />
                <button type="submit">Assign Test</button>
            </form>
            <div>{result}</div>
        </div>
    );
};

export default AssignTest;
