import './App.css';
import Signup from './Signup';
import Login from "./Login";
import Home from "./Home";
import React from 'react';
import Details from './Details';
import Checkout from './Checkout'
import Add from './Add'
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/details' element={<Provider store={store}><Details/></Provider>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/add' element={<Add/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
