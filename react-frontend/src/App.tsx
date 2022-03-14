import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Home';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Route path={'/'}>
                <Home />
            </Route>
        </HashRouter>
    );
};

export default App;
