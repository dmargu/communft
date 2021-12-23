import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/Auth';
import { AuthRoute, ProfileRoute } from './utils/PrivateRoutes';
import SignUpWidget from './components/SignUpWidget';
import LoginWidget from './components/LoginWidget';
import ProfileWidget from './components/ProfileWidget';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {

  return (
    <AuthProvider>
      <div className="AppContainer">
        <Router>
          <Routes>
            <Route path='*' element={<Navigate to='/register' />} />
            <Route element={<AuthRoute />}>
              <Route path='/register' element={<SignUpWidget />} />
            </Route>
            <Route element={<AuthRoute />}>
              <Route path='/login' element={<LoginWidget />} />
            </Route>
            <Route element={<ProfileRoute />}>
              <Route path='/profile' element={<ProfileWidget />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
