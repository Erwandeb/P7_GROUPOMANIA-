import React from 'react';
import LandingPage from '../pages/Landing-page/Landing-page.jsx';
import HomePage from '../pages/Homepage-page.jsx';
import User from '../pages/User-page.jsx';
import NotFound from '../pages/Notfound-page.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const RouterFront = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/user/:id" element={<User/>} />
                <Route component={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
};

export default RouterFront;