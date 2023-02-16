import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom';


const Guard = () => {
    const navigateTo = useNavigate();
    const token = useSelector(state => state.user.token);
    if(!token) {
        return navigateTo('/');
    }
    return <Outlet/>;
};

export default Guard;