import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Category from './category/Category';
import Post from './Post';
import Navigation from './Navigation';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <br />
            <br />
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/:category/:post'} element={<Post />} />
                <Route path={'/:category'} element={<Category />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
