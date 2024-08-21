import React, { useState } from 'react';
import axios from 'axios';

const TakeTest = () => {
    const [testId, setTestId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [test, setTest] = useState(null);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitResult, setSubmitResult] = useState(null);

    // Function to handle fetching test details based on test ID
    const fetchTest = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/student/tests/${testId}`);
            setTest(response.data);
            initializeAnswers(response.data.questions); // Initialize answers state with empty values
            setError(null);
        } catch (error) {
            setError('Failed to fetch test details.');
        }
    };

    // Function to initialize answers state with empty values
    const initializeAnswers = (questions) => {
        const initialAnswers = {};
        questions.forEach(question => {
            initialAnswers[question.questionText] = '';
        });
        setAnswers(initialAnswers);
    };

    // Function to handle changes in selected answers
    const handleAnswerChange = (questionText, selectedOption) => {
        setAnswers({ ...answers, [questionText]: selectedOption });
    };

    // Function to handle test submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const answerValues = Object.values(answers);
            const response = await axios.post(`http://localhost:8080/api/student/submitTest/${testId}?rollNumber=${studentId}`, answerValues);
            setSubmitResult(response.data);
        } catch (error) {
            setError('Failed to submit test.');
        }
    };

    return (
        <div className="container">
            <h1>Take Test</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Test ID"
                    value={testId}
                    onChange={(e) => setTestId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <button onClick={fetchTest}>Fetch Test</button>
            </div>
            {error && <div className="error">{error}</div>}
            {test && (
                <div>
                    <h2>Test: {test.subject}</h2>
                    <form onSubmit={handleSubmit}>
                        {test.questions.map((question, index) => (
                            <div key={index}>
                                <h3>{question.questionText}</h3>
                                <div>
                                    {question.options.map((option, optIndex) => (
                                        <div key={optIndex}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    checked={answers[question.questionText] === option}
                                                    onChange={() => handleAnswerChange(question.questionText, option)}
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <br />
                        <button type="submit">Submit Test</button>
                    </form>
                </div>
            )}
            {submitResult && (
                <div>
                    <h2>Submission Result:</h2>
                    <p>Score: {submitResult.score}</p>
                </div>
            )}
        </div>
    );
};

export default TakeTest;
