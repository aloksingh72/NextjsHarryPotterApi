"use client";

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Book from './Components/Book';
import Character from "./Components/Character";
// import Spell from "./Components/Spell";
// import Movies from "./Components/Movies";
import Navbar from './Components/Navbar';

const App: React.FC = () => {
  return (
    <Router>  {/* Wrap your app in Router */}
      <div className="">
        <Navbar path="/"/>
        {/* Uncomment and use Routes as needed */}
        <Routes>
          <Route path="/" element={<Book />} />
          {/* <Route path="/spell" element={<Spell />} /> */}
          <Route path="/character" element={<Character />} />
          {/* <Route path="/movies" element={<Movies />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
