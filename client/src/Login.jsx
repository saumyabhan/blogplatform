import React, { useEffect, useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    // State variables to store form data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to backend API
            const response = await axios.post('http://localhost:3001/login',
                { email, password, }
            );

            // Check if registration was successful
            if (response.status === 200) {
                window.location.href = "/"
            } else {
                alert('An error occurred');
            }
        } catch (error) {
            console.error('Error loging in user:', error);
            alert('Error loging in user');
        }
    }

    return (
        <div>
            <div className='register'>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button>Sign In</button>
                </form>
                <p>Don't have an account?</p>
                <div>
                    <Link to="/register"><button>Sign Up</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Login
