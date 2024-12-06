import React from 'react';
import './App.css';
import { Route, HashRouter, Routes } from 'react-router-dom'
import { Menu } from 'components/Menu/Menu';
import { Home } from 'components/HomePage/Home';
import { Modal } from 'components/modalWindow/ModalWindow';
import { Basket } from 'components/Basket/Basket';
import razer from '../src/components/img/Razer.jpg'
import logitech from '../src/components/img/logitech.webp'
import hyperX from '../src/components/img/hyperx.jpg'

const images = [razer, logitech, hyperX,];

const interval = 3000;

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Menu />
        <Modal />
        <Basket />
        <Routes>
          <Route path='home' element={<Home images={images} interval={interval} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
