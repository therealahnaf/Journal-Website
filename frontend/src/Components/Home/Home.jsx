import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
export const Home = () => {
  return (
    <div className='content'>
        <div className='left-content'>
            <div className="title">
                <h1>MoodLog</h1>
                <p>This is a test and here there will be a lot of descriptions about the website we are building</p>
            </div>
        </div>
        <div className="right-content">
            <button><Link to='/Login'>Login</Link></button>
            <button><Link to='/Signup'>Signup</Link></button>
        </div>
    </div>
  )
}
export default Home;
