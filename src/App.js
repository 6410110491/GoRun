import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './componants/Home';
import Topbar from './componants/Topbar';
import All_events from './componants/All_events';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<All_events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
