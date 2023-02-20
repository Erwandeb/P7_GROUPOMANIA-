import React from 'react';
import Header from '../../components/general/header/header';
import '../Homepage/Homepage.css';
import Post from '../../components/posts/Post'

const HomePage = () => {
    return (
        <>
        <Header/>
        <div className='homepage'>
           <p className='highlight'>Suivez le fil d'actualité ici :</p>
        </div>
        <Post/>
        </>

    );
};

export default HomePage;