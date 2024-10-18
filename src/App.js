import React from 'react';
import {Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Header from './pages/header/header';
import Footer from './pages/footer/footer';
import GameShop from './pages/gameShop/gameShop'
import ErrorPage from './pages/errorPage/errorPage'
import GameSnake from './pages/gameSnake/gameSnakeNe'

import './App.css';

import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path='/' element={<GameShop/>}/>
          <Route path='/GameSnake' element={<GameSnake/>}/>
          <Route path='*' element={<ErrorPage/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
