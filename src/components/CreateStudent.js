import React, { useState } from 'react';
import axios from 'axios';

const CreateStudent = () => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/admin/createStudent', {
        name,
        rollNumber,
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('An error occurred while creating the student.');
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Create Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
      {response && (
        <div>
          <h2>Student Created Successfully</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default CreateStudent;
