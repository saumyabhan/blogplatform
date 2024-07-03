import React, { useContext, useState } from 'react';
import './style.css';
import axios from 'axios';
import { userContext } from './App'
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const user = useContext(userContext)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("post button clicked")
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("email", user.email);
        formData.append("file", file);

        try {
            const res = await axios.post('http://localhost:3001/create', formData);
            if (res.data === "success") {
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className='createform'>
                <form onSubmit={handleSubmit}>
                    <h3 className='heads'>Create Post</h3>
                    <input type="text" placeholder="Title" className="post-title" onChange={(e) => setTitle(e.target.value)} required />
                    <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required></textarea>
                    <input type="file" name="" id="" className="file-input" onChange={(e) => setFile(e.target.files[0])} required />
                    <button className="post-btn">Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
