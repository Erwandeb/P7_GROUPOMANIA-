import React, { useState, useEffect } from 'react';
import Login  from '../../components/landingpage/login/Login.jsx';
import SignUp from '../../components/landingpage/signup/SignUp.jsx'
import '../Landing-page/landing-page.css';
import Logo from '../../components/general/logo/Logo';

const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className="login">
            <Logo/>
            <main>
                <section className="connexion">
                <h1 onClick={() => setShowSignUp(!showSignUp)} >
                    {showSignUp ? "Inscription :" : "Connexion :"}
                </h1>
                    
                {showSignUp ? (
                        <SignUp />
                    ) : (
                        <Login />
                    )
                }

                <p onClick={() => setShowSignUp(!showSignUp)}>Vous n'êtes pas encore inscrit ?</p>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;