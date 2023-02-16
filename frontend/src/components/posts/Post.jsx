import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUserData } from '../../../features/user.slice';
import { getAllPost } from '../../../clienthttp/api';


const Posts = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (isLogin) {
        navigateTo("/home");
        }
    }, [isLogin, navigateTo]);

    const getPost = async (e) => {
        e.preventDefault();
        try {
        const res = await getAllPost(email, password);
        dispatch(setUserData(res.data.token));
        } catch (err) {
        console.log( err.response || err.message);
        }
    };

    return (
        <>

        </>
  );
};

export default Posts;