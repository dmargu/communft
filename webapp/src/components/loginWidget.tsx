import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../context/Auth';
import { LOGIN_USER } from '../graphql/Mutations';
import './components.css'


const LoginWidget = () => {
    const context = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>({});

    const navigate = useNavigate();

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        variables: {
            username,
            password
        },
        onCompleted: (data: any) => {
            //send user data to context
            context.login(data.login);
            navigate('/profile');
        },
        onError: (err: any) => {
            setErrors(err.graphQLErrors[0].extensions.errors);
        }
    });

    //we should eventually validate data on frontend here to reduce work on the backend, keeping it out now for simplicity
    const handleSubmit = () => {
        //send data to backend
        loginUser();
    };
    
    return (
        <div className='WidgetContainer'>
            <Form onSubmit={handleSubmit} className={loading ? 'loading' : ''}>
                <h1 className='FormHeaderText'>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='ilovenfts'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors.username ? true : false}
                />
                <Form.Input
                    label='Password'
                    type='password'
                    placeholder='wittyNFTreference1!'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password ? true : false}
                />
                <Form.Button type='submit' disabled={loading} primary>Submit</Form.Button>
            </Form>
            {Object.values(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map((err: any) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className='LinkContainer'>
                <p>Don't have an account? <a href='/'>Sign Up</a></p>
            </div>
        </div>
    );
};

export default LoginWidget;