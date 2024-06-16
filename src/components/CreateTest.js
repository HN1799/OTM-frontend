import React, { useState } from 'react';
import axios from 'axios';

const CreateTest = () => {
    const [test, setTest] = useState({
        subject: '',
        questions: [],
        duration: ''
    });

    const [question, setQuestion] = useState({
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });

    const [result, setResult] = useState('');

    const handleTestChange = (e) => {
        setTest({ ...test, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const options = [...question.options];
        options[index] = value;
        setQuestion({ ...question, options });
    };

    const addQuestion = () => {
        const newQuestion = {
            questionText: question.questionText,
            options: [...question.options],
            correctAnswer: question.correctAnswer
        };
        setTest({ ...test, questions: [...test.questions, newQuestion] });
        setQuestion({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/admin/createTest', test)
            .then(response => {
                setResult('Test created successfully');
                setTest({ subject: '', questions: [], duration: '' }); // Clear form after successful submission if needed
            })
            .catch(error => {
                setResult(`Error: ${error.message}`);
            });
    };

    return (
        <div className="container">
            <h1>Create Test</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" value={test.subject} onChange={handleTestChange} required /><br /><br />
                
                <label htmlFor="duration">Duration:</label>
                <input type="text" id="duration" name="duration" value={test.duration} onChange={handleTestChange} required /><br /><br />
                
                <fieldset>
                    <legend>Add Question</legend>
                    <label htmlFor="questionText">Question Text:</label>
                    <textarea id="questionText" name="questionText" value={question.questionText} onChange={handleQuestionChange}></textarea><br /><br />
                    <label>Options:</label><br />
                    {question.options.map((option, index) => (
                        <React.Fragment key={index}>
                            <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} /><br />
                        </React.Fragment>
                    ))}
                    <label htmlFor="correctAnswer">Correct Answer:</label>
                    <input type="text" id="correctAnswer" name="correctAnswer" value={question.correctAnswer} onChange={handleQuestionChange} /><br /><br />
                    <button type="button" onClick={addQuestion}>Add Question</button>
                </fieldset><br /><br />
                <button type="submit">Create Test</button>
            </form>
            <div>{result}</div>
        </div>
    );
};

export default CreateTest;
