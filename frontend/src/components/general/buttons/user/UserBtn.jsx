import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../../../../assets/user.svg'
import '../user/userBtn.css';


const UserBtn = () => {
    const navigateTo = useNavigate();

    const handleLogout = async (e) => {
        navigateTo("/");
    }

    return (
        <a href='/' onClick={handleLogout} className='userBtn'>
          <img src={userImage} alt='Logo de groupomania'/>
        </a>
    );
};

export default UserBtn;