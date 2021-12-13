import React, { useState } from 'react';
import db from './firebase';
import LoginOrSignupWidget from './components/loginOrSignupWidget';
import SignUpWidget from './components/signUpWidget';
import LoginWidget from './components/loginWidget';
import ProfileWidget from './components/profileWidget';
import './App.css';

function App() {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(db);

  return (
    <div className="AppContainer">
      {!signUpVisible && !loginVisible && !loggedIn && 
        <LoginOrSignupWidget 
          setSignUpVisible={() => setSignUpVisible(true)} 
          setLoginVisible={() => setLoginVisible(true)}/>
      }
      {signUpVisible && 
        <SignUpWidget 
          setLoggedIn={() => setLoggedIn(true)}
          setSignUpInvisible={() => setSignUpVisible(false)}
        />
      }
      {loginVisible && 
        <LoginWidget 
          setLoggedIn={() => setLoggedIn(true)}
          setLoginInvisible={() => setLoginVisible(false)}
        />
      }
      {loggedIn && <ProfileWidget />}
    </div>
  );
}

export default App;
