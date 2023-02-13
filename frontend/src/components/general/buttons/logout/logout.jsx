import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import '../logout/logout.css';
import { logout } from '../../../../features/user.slice';

const LogoutBtn = () => {

    const dispatch = useDispatch();
    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        dispatch(logout());
      } catch (err) {
        console.log( err.response || err.message);
      }
    }

    return (
        <a href='' onClick={handleLogout} className='logout'>
            Me Déconnetecter
        </a>
    );
};

export default LogoutBtn;