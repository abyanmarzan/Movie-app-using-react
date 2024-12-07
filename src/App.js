import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Search from './Search';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<MovieDetails />} />
                <Route path="/search/:term" element={<Search />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </div>
    );
};

export default App;

