// LoginSignup.js
import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import axios from 'axios'

export const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('',{name,email,password})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="background">
      <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === 'Login' ? <div></div> : <div className="input">
          <img src={user_icon} alt="" />
          <input type="name" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        </div>}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </div>
      {action === 'Sign Up' ? <div /> : <div className="forgot-password">Forgot your Password? <span>Click Here!</span></div>}
      <div className="submit-container">
        <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => { setAction('Sign Up') }}>Sign Up</div>
        <div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => { setAction('Login') }}>Login</div>
      </div>
      </div>
    </div>
    </form>
  );
};

export default LoginSignup;
