import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const Guard = ({ children }) => {
    const navigateTo = useNavigate();
    const token = useSelector(state => state.user.token);
    if (!token) {
        return navigateTo('/');
    }
    return <>{children}</>;
};

export default Guard;