import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {

    
  return (
    <nav className="navbar1">
        <div className="logo-container">
            <span className="logo-text"><span>A</span>rt <span>C</span>orner</span>
        </div>
        <ul className="nav-list1">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/artist">Artist</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/artist">Portrait Artist</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/artist">
                    <i className="fas fa-microphone-alt"></i>Wall Artist</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link" href="/">
                    Artist          </a>
                <div className="dropdown-content">
                    <Link to="/artistLogin">Login</Link>
                    <Link to="/artistRegister">Register</Link>
                </div>
            </li>
            <li className="nav-item dropdown">
                <span className="nav-link">
                    User          </span>
                <div className="dropdown-content">
                    <Link to="/userlogin">Login</Link>
                    <Link to="/userRegister">Register</Link>
                </div>
            </li>
        </ul>
    </nav>
  );
};

export default Header;