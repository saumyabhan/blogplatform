import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getposts');
                setPosts(response.data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            }
        };
        fetchPosts();
    }, []);

    return (

        <div className='posts_container'>
            {
                posts.map(post => (
                    <Link to={`/post/${post._id}`} className='post' >
                        <img src={`http://localhost:3001/Images/${post.file}`} alt="" />
                        <div className='post_text'>
                            <h2>{post.title}</h2>
                            <p>{post.description}</p>
                        </div>
                    </Link>
                ))
            }
        </div>

    )
}

export default Home
