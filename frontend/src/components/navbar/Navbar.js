import React from 'react';
import './navbar.css';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function Navbar() {
  const token = localStorage.getItem("token");
  const decodedtoken = jwt_decode(token);
  const email = decodedtoken.email;

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  return (
    <div className='navbar'>
        <Link to={`${email}/dashboard`} className='logo'>To Do App</Link>
        <div className='menu'>
            <Link to={`${email}/profile`} className='nav-profile-btn'><i className="fa-solid fa-circle-user"/> <span className='profile-txt'>Profile</span></Link>
            <div className='nav-logout-btn' onClick={logout}><i className="fa-solid fa-power-off"/> <span className='logout-txt'>Logout</span></div>
        </div>
    </div>
  )
}
