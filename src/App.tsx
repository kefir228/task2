import React from 'react';
import './App.css';
import { Route, HashRouter, Routes } from 'react-router-dom'
import { Menu } from 'components/Menu/Menu';
import { Home } from 'components/HomePage/Home';
import { Modal } from 'components/modalWindow/ModalWindow';
import { Basket } from 'components/Basket/Basket';
import { Registration } from './components/Registration/Registration';
import { Admin } from 'components/AdminPage/Admin';
import { CustomCard } from 'components/AdminPage/CreateCustomCard/CustomCard';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Menu />
        <Modal />
        <Basket />
        <Registration/>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/create' element={<CustomCard/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
