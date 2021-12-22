import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpWidget from './components/signUpWidget';
import LoginWidget from './components/loginWidget';
import ProfileWidget from './components/profileWidget';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {

  return (
    <div className="AppContainer">
      <Router>
        <Routes>
          <Route index element={<SignUpWidget />} />
          <Route path='/login' element={<LoginWidget />} />
          <Route path='/profile' element={<ProfileWidget />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
