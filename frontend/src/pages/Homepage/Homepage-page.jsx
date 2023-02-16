import React from 'react';
import Header from '../../components/general/header/header';
import '../Homepage/Homepage.css';

const HomePage = () => {
    return (
        <>
        <Header/>
        <div className='homepage'>
           <p className='highlight'>Suivez le fil d'actualité ici :</p>
        </div>
        </>

    );
};

export default HomePage;