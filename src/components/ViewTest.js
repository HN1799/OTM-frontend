import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewTest.css'; // Import the CSS file

const ViewTest = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/student/tests');
        setTests(response.data);
      } catch (err) {
        setError('An error occurred while fetching the tests.');
      }
    };

    fetchTests();
  }, []);

  const calculateTotalMarks = (questions) => {
    return questions.length * 1; // Assuming each question is worth 1 mark
  };

  return (
    <div className="container">
      <h1>View Tests</h1>
      {error && <div className="error">{error}</div>}
      <table className="tests-table">
        <thead>
          <tr>
            <th>Test ID</th>
            <th>Subject</th>
            <th>Number of Questions</th>
            <th>Total Marks</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test => (
            <tr key={test.id}>
              <td>{test.id}</td>
              <td>{test.subject}</td>
              <td>{test.questions.length}</td>
              <td>{calculateTotalMarks(test.questions)}</td>
              <td>{test.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTest;
