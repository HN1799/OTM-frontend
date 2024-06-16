import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeTest = () => {
    const [test, setTest] = useState(null);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [submitResult, setSubmitResult] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/student/tests/1');
                setTest(response.data);
                initializeAnswers(response.data.questions); // Initialize answers state with empty values
            } catch (error) {
                setError('Failed to fetch test details.');
            }
        };

        fetchTest();
    }, []);

    const initializeAnswers = (questions) => {
        const initialAnswers = {};
        questions.forEach(question => {
            initialAnswers[question.questionText] = '';
        });
        setAnswers(initialAnswers);
    };

    const handleAnswerChange = (questionText, selectedOption) => {
        setAnswers({ ...answers, [questionText]: selectedOption });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const answerValues = Object.values(answers);

        try {
            const response = await axios.post(`http://localhost:8080/api/student/submitTest/${test.id}?rollNumber=12345`, answerValues);
            setSubmitResult(response.data);
        } catch (error) {
            setError('Failed to submit test.');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!test) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Take Test - {test.subject}</h1>
            <form onSubmit={handleSubmit}>
                <h2>Questions:</h2>
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
