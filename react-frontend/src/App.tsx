import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Post from './Post';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/:category'} element={<Category />} />
                <Route path={'/:category/:post'} element={<Post />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
