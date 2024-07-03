import React, { createContext, useEffect, useState } from 'react';
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import Home from './Home';
import axios from 'axios';
import CreatePost from './CreatePost';
import Post from './Post';
import EditPost from './EditPost';

export const userContext = createContext()

function App() {

  const [user, setUser] = useState({})

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Reset user state if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create' element={<CreatePost />}></Route>
          <Route path='/post/:id' element={<Post />}></Route>
          <Route path='/editpost/:id' element={<EditPost />}></Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
