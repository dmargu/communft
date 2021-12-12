import React, { useState } from 'react';
import './components.css'

interface Props {
    setLoggedIn: () => void;
    setLoginInvisible: () => void;
}

const LoginWidget = (props: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        props.setLoggedIn();
        props.setLoginInvisible();
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
                <p>Password:</p>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default LoginWidget;