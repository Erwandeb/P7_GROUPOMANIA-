import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import '../logout/logout.css';
import { logout } from '../../../../features/user.slice';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        dispatch(logout());
        navigateTo('/');
      } catch (err) {
        console.log( err.response || err.message);
      }
    }

    return (
        <a href='' onClick={handleLogout} className='logout'>
            Déconnexion
        </a>
    );
};

export default LogoutBtn;