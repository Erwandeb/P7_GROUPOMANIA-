import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../../assets/logo.png'
import '../logo/logo.css';

const Logo = () => {
    const navigateTo = useNavigate();

    const handleLogout = async (e) => {
        navigateTo("/home");
    }

    return (
        <a href='' onClick={handleLogout} className='logocontainer'>
          <img src={logoImage} alt='Logo de groupomania'/>
        </a>
    );
};

export default Logo;