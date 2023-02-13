import React, { useState, useEffect } from 'react';
import Login  from '../../components/landingpage/login/Login.jsx';
import SignUp from '../../components/landingpage/signup/SignUp.jsx'
import '../Landing-page/landing-page.css';

const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className="login">
            <main>
                <section className="connexion">
                <h1 onClick={() => setShowSignUp(!showSignUp)} >
                    {showSignUp ? "Sign Up" : "Login"}
                </h1>
                    
                {showSignUp ? (
                        <SignUp />
                    ) : (
                        <Login />
                    )
                }
                </section>
            </main>
        </div>
    );
};

export default LandingPage;