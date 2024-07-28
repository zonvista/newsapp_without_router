import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
         <Routes>
            <Route path='/' element={ <Navbar />}/>
            <Route path='/about' element={<News pageSize={8} category = {"science"}/>} />
          </Routes>
          <Navbar />
          <News pageSize={8} category = {"science"}/>
      </div>
    )
  }
}

