import React from 'react';
import './App.css';
import { Route, HashRouter, Routes } from 'react-router-dom'
import { Menu } from 'components/Menu/Menu';
import { Home } from 'components/HomePage/Home';
import { Modal } from 'components/modalWindow/ModalWindow';
import { Basket } from 'components/Basket/Basket';
import { Registration } from './components/Registration/Registration';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Menu />
        <Modal />
        <Basket />
        <Registration/>    
        <Routes>
          <Route path='' element={<Home/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
