import React, { useState } from 'react';
import './components.css'

interface Props {
    setLoggedIn: () => void;
    setSignUpInvisible: () => void;
}

const SignUpWidget = (props: Props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //we have to validate the data on the backend anyway, should still do it on the frontend to improve UX and reduce work for the backend

    //checks if password is equal to confirmed password and contains at least 8 characters, one capital letter, one number and one special character
    const checkPassword = () => {
        if (password === confirmPassword && password.length >= 8 && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
            return true;
        } else {
            return false;
        }
    };

    //checks if email is valid
    const checkEmail = () => {
        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = () => {
        props.setLoggedIn();
        props.setSignUpInvisible();
    };

    return (
        <div>
            <div className="FieldContainer">
                <p>Username:</p>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="FieldContainer">
                <p>Email:</p>
                <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="FieldContainer">
                <p>Password:</p>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="FieldContainer">
                <p>Confirm Password:</p>
                <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit}>Sign Up</button>
        </div>
    )
};

export default SignUpWidget;