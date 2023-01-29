import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../login/login.css'
import HomePage from '../../pages/Homepage-page';
// const { navigate } = navigate();

const SignIncontent = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // useEffect(() => {

       
    //     }, []);

        const handleLogin = async () => {
            const response = await axios.get('localhost:3000/auth/login', {
                params: {
                    email: email,
                    password: password
                }
            });
            console.log(response.data);
            };
            handleLogin();

    // client HTTP
        // const handleLogin = async (e) => {
        //     e.preventDefault();
        //     try {
        //         const response = await axios.post('localhost:3000/auth/login', {
        //             email,
        //             password,
        //         });
        //     //  localStorage.setItem("token", res.data.body.token);
        //     //  Token dans redux
        //         // navigate(<HomePage/>);
                
        //     } catch (err) {
        //         console.log(err.data);
        //     }


    return (
        <section className="sign-in">
            <h1>Sign In</h1>
            <form action="" onSubmit={handleLogin} className='login-form'>
                <div className="input-wrapper">
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="text" 
                        id="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        minLength="2"
                        maxLength="15"
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
                            maxLength="15"
                        />
                </div>
               
                <button type="submit" className="button">Sign in</button>
            </form>
            
        </section>
        
    );
};

export default SignIncontent;