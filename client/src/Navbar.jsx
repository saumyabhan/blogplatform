import React, { useContext } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios'

function Navbar() {
    const user = useContext(userContext)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3001/logout');
            window.location.reload();
            // navigate('/'); // Navigate to the home page or any other page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className='navbar'>
            <div><h3>Blogify</h3></div>
            <div >
                <Link to="/" className='linx'>Home</Link>

                {
                    user.username ?
                        <Link to='/create' className='linx'>Create a blog</Link>
                        : <></>
                }

                <a href="#" className='linx'>Contact</a>
            </div>

            {
                user.username ?
                    <div>
                        <button onClick={handleLogout} className='linx'>Logout</button>

                    </div>
                    :
                    <div >
                        <Link to="/register" className='linx'>Sign In/Sign Up</Link>
                    </div>
            }

        </div>
    )
}

export default Navbar
