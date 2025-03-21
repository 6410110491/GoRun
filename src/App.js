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
import News from './componants/News';
import Data_org from './componants/Data-organizer-event/Data_org';
import App_history from './componants/App_history';
import App_information from './componants/App_information';
import Personal_information from './componants/Personal_information';
import News_2 from './componants/News_2';
import Evevt_history from './componants/Evevt_history';
import Admin_page from './componants/Admin_page';
import ApplicantsInfo from './componants/ApplicantsInfo';
import Edit_org_main from './componants/Data-organizer-event/Edit_org_main';
import ResetPasswordPage from './componants/ResetPasswordPage';
import SetNewPasswordPage from './componants/SetNewPasswordPage';
import NotFound from './componants/NotFound ';

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
          <Route path="/event/detail/:id" element={<Card_event_detail />} />
          <Route path="/event/form/:id" element={<Form_page />} />
          <Route path="/organizer" element={<Organizer />} />
          <Route path="/dataorganizer" element={<Data_org />} />
          <Route path="/news" element={<News />} />
          <Route path="/apphistory" element={<App_history />} />
          <Route path="/myevent/:id/applicants-info" element={<App_information />} />
          <Route path="/personal" element={<Personal_information />} />
          <Route path="/news/:id" element={<News_2 />} />
          <Route path="/eventhistory" element={<Evevt_history />} />
          <Route path="/admin" element={<Admin_page />} />
          <Route path='/event/:id/applicants-info' element={<ApplicantsInfo />} />
          <Route path='dataorganizer/edit/:id' element={<Edit_org_main />} />
          <Route path='/password/reset' element={<ResetPasswordPage />} />
          <Route path="/reset-password/:token" element={<SetNewPasswordPage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
