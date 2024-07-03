import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userContext } from './App'

function Post() {

    const { id } = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate();
    const user = useContext(userContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:3001/getpostbyid/${id}`);
                setPost(result.data);
            } catch (error) {
                console.error('Error fetching post by ID:', error);
            }
        };

        fetchData();
    }, []);
    // }, [id]);  Include id in the dependency array to fetch new data when id changes

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`http://localhost:3001/deletepost/${id}`);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="blog-post">
            <div>
                <img className="blog-post-image" src={`http://localhost:3001/Images/${post.file}`} alt="" />
                <div className="blog-post-content">
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-description">{post.description}</p>
                </div>
            </div>
            <div className='updations'>

                {
                    user.email === post.email ?
                        <>
                            <Link to={`/editpost/${post._id}`}><button>Edit</button></Link>
                            <button onClick={e => handleDelete(post._id)}>Delete</button>
                        </> : <></>

                }

            </div>
        </div>

    )
}

export default Post
