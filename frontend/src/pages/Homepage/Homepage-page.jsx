import React from 'react';
import Header from '../../components/general/header/header';
import '../Homepage/Homepage.css';
import Post from '../../components/posts/Post'

const HomePage = () => {
    return (
        <>
        <Header/>
        <div className='homepage'>
            <div className='post-create-container'>
                <p className='baseline'>Qu'avez vous en -tête ?</p>
                {/* AJOUTER LE BLOC CREATE POST ICI */}
            </div>
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