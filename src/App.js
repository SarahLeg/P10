import React from 'react';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout.js';
import Home from './pages/home.js';
import SignIn from './pages/sign-in.js';
import Accounts from './pages/accounts.js';
//import Transactions from './pages/transactions.js';

function App() {
  const express = require('express');
  const connectDB = require('./database/connexion');
  const app = express();
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="sign-in" element={<SignIn/>}/>
            <Route path="accounts" element={<Accounts/>}/>
            {/* <Route path="transactions" element={<Transactions/>}/> */}
          </Route>
        </Routes>
    </Router>
  );
}

export default App;

connectDB();