import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './componants/Home';
import Topbar from './componants/Topbar';
import All_events from './componants/All_events';
import Calendar from './componants/Calendar';
import Login from './componants/Login';
import Signup from './componants/Signup';
import Footer from './componants/Footer';
import Card_event_detail from './componants/Card_event_detail';
import Form_page from './componants/form-register-event/Form_page';
import Organizer from './componants/Organizer';
import Data_org_1 from './componants/Data_org_1';
import News from './componants/News';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/event" element={<All_events />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/event/detail" element={<Card_event_detail />} />
          <Route path="/event/form" element={<Form_page />} />
          <Route path="/organizer" element={<Organizer />} />
          <Route path="/dataorganizer" element={<Data_org_1 />} />
          <Route path="/news" element={<News/>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
