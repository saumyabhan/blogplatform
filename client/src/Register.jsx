import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {

    // State variables to store form data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to backend API
            const response = await axios.post('http://localhost:3001/register',
                { username, email, password, }
            );

            // Check if registration was successful
            if (response.status === 201) {
                navigate('/login') // Redirect the user to login page here
            } else {
                alert('An error occurred while logging in');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }

    }

    return (
        <div>
            <div className='register'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Username:</label>
                        <input type="text" placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button>Sign Up</button>
                </form>
                <p>Already have an account?</p>
                <div>
                    <Link to="/login"><button>Sign In</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Register
