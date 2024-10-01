import React from 'react';
import './styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout.js';
import Home from './pages/home.js';
import SignIn from './pages/sign-in.js';
import Dashboard from './pages/dashboard.js';
import Transactions from './pages/transactions.js';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home />} />
            <Route path="sign-in" element={<SignIn/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="transactions" element={<Transactions/>}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;