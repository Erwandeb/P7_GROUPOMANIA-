import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import '../login/login.css'
import { setUserData } from '../../../features/user.slice';
import { login } from '../../../clienthttp/api';
import HomePage from '../../../pages/Homepage-page';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const SignIncontent = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
      if (isLogin) {
      navigateTo("/home");
      }
  }, [isLogin, navigateTo]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      dispatch(setUserData(res.data.token));
      setIsLogin(true);
    } catch (err) {
      console.log( err.response || err.message);
    }
  };

  return (
      <form action="" onSubmit={handleLogin} className='login-form'>
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
          <button type="submit" className="button">Sign in</button>
      </form>
  );
};

export default SignIncontent;