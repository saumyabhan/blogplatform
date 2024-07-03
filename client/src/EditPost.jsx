import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { id } = useParams()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("post button clicked")

        try {
            const res = await axios.put('http://localhost:3001/editpost/' + id, { title, description });
            if (res.data === "success") {
                console.log("Post Edited")
                navigate('/')
                // window.location.href = "/";
            }
            console.log("Couldn't edit")
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/getpostbyid/${id}`);
                setTitle(result.data.title);
                setDescription(result.data.description);
            } catch (error) {
                console.error('Error fetching post by ID:', error);
            }
        };

        fetchData();
        // }, [id]);
    }, []);

    return (
        <div>
            <div className='createform'>
                <form onSubmit={handleSubmit}>
                    <h3 className='heads'>Update Post</h3>
                    <input type="text" placeholder="Title" value={title} className="post-title" onChange={(e) => setTitle(e.target.value)} required />
                    <textarea name="desc" id="desc" cols="30" rows="10" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required></textarea>
                    <button className="post-btn">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditPost;
