import React from 'react';
import Header from '../../components/general/header/header';
import '../Homepage/Homepage.css';
import Post from '../../components/posts/Post'
import Createpost from '../../components/createpost/Createpost';

const HomePage = () => {
    return (
        <>
        <Header/>
        <div className='homepage'>
            <div className='homeage-baseline'>
                <p className='highlight'>Suivez le fil d'actualité ici :</p>
            </div>
           
            <div className='post-container'>
                <Post/>
            </div>
        </div>
        </>
    );
};

export default HomePage;