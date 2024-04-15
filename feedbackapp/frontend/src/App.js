import React from 'react';
import Header from './components/Header';
import Addrespond from './components/Addrespond';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
  <Router>
    <div>
      <Header/>
      <Routes>
      <Route path="/add" element={<Addrespond />} />
      </Routes>
      
    </div>
  </Router>   
  );
}

export default App;
