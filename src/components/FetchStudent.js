import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FetchStudent.css'; // Import the CSS file

const FetchStudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/getAllStudent');
        setStudents(response.data);
      } catch (err) {
        setError('An error occurred while fetching the students.');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h1>Student List</h1>
      {error && <div className="error">{error}</div>}
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.results && student.results.length > 0 ? student.results.join(', ') : 'No Results'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchStudent;
