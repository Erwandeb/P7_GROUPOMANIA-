import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import '../signup/signup.css';
import { setUserData } from '../../../features/user.slice';
import { signup } from '../../../clienthttp/api';


const SignUpcontent = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        const res = await signup(email, password);
        dispatch(setUserData(res.data.token));
      } catch (err) {
        console.log( err.response || err.message);
      }
    }

    return (
        <form action="" onSubmit={handleSignup} className='login-form'>
            <div className="input-wrapper">
                <label htmlFor="email">E-mail</label>
                <input 
                    type="text" 
                    id="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    minLength="2"
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label >
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        minLength="2"
                    />
            </div>
            <button type="submit" className="button">Sign Up</button>
        </form>
    );
};

export default SignUpcontent;