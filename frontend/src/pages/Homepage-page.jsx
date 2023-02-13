import React from 'react';
import Guard from "../guard/guard";
import LogoutBtn from '../components/general/buttons/logout/logout';

const HomePage = () => {

    return (
        <Guard>
            <LogoutBtn/>
            <p>test</p>
            <h1>Protected Route</h1>
        </Guard>
    );
};

export default HomePage;