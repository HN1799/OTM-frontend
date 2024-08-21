import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import './Login.css'; // Import a CSS file for styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const history = useHistory(); // Hook for programmatic navigation

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', null, {
                params: {
                    username,
                    password,
                },
            });

            const role = response.data;
            login({ username, role });
            history.push(role === 'admin' ? '/admin' : '/student');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    const handleRegister = () => {
        console.log('Navigating to /create-student'); // Debugging step
        history.push('/create-student'); // Redirect to the Create Student page
    };

    return (
        <div className="login-container">
            <div className="logo">
                <h1>Online Test Management</h1>
            </div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleLogin} className="login-button">Login</button>
            <button onClick={handleRegister} className="register-button">Register</button>
        </div>
    );
};

export default Login;
