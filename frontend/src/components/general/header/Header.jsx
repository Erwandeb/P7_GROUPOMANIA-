import React from 'react';
import '../header/header.css';
import LogoutBtn from '../buttons/logout/logout';
import Logo from '../logo/Logo';
import UserBtn from '../buttons/user/UserBtn';

const Header = () => {
    return (
       <header>
            <div className='container'>
                <Logo/>
                <div className='btn-actions'>
                    <UserBtn/>
                    <LogoutBtn/>
                </div>
                
            </div>
       </header>
    );
};

export default Header;