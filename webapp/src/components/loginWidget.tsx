import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
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
            <Form>
                <h1 className='FormHeaderText'>COMMUNFT Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='ilovenfts'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Input
                    label='Password'
                    type='password'
                    placeholder='wittyNFTreference1!'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form>
            <button className='FormButton' onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default LoginWidget;