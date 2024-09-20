import React, { useState } from 'react';
import { API_URL } from '../data/apiPath';

const Register = ({ showLogin }) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUserName('');
        setEmail('');
        setPassword('');
        alert('Vendor registered successfully');
        showLogin();
      }
    } catch (err) {
      console.log('registration failed', err.message);
      alert('Registration failed');
    }
  };

  return (
    <div className='register-section'>
      <form className='auth-form' onSubmit={submitHandler}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input
          type='text'
          placeholder='Enter your name'
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className='btn-submit'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
