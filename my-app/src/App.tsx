import React from 'react'
import {Route,Routes,} from "react-router-dom";
import Home from './components/pages/home/Home';
import Header from './components/Header/Header';
import Basket from './components/pages/Basket/Basket'
import Card from './components/pages/Card/Card'

function App() {

  return (
    <>
      <Header />
      <div className='Home-container'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/basket" element={<Basket />}/>
        <Route path="/card/:id" element={<Card/>}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
