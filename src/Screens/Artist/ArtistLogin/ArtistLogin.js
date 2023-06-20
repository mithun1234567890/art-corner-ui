import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArtistLogin.css'


const ArtistLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
      setError('');
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setError('');
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Perform validation
      if (username.trim() === '' || password.trim() === '') {
        setError('Please enter both username and password');
        return;
      }
  
      // Handle login logic here
      console.log('Username:', username);
      console.log('Password:', password);
  
      // Reset form fields
      setUsername('');
      setPassword('');
      setError('');
    };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default ArtistLogin;