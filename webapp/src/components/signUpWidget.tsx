import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import './components.css'


const SignUpWidget = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<any>({});

    const navigate = useNavigate();

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        variables: {
            username,
            email,
            password,
            confirmPassword
        },
        onCompleted: (data: any) => {
            console.log(data);
            navigate('/profile');
        },
        onError: (err: any) => {
            setErrors(err.graphQLErrors[0].extensions.errors);
        }
    });

    //we should eventually validate data on frontend here to reduce work on the backend, keeping it out now for simplicity
    const handleSubmit = () => { 
        //send data to backend
        registerUser();
    };

    return (
        <div className='WidgetContainer'>
            <Form onSubmit={handleSubmit} className={loading ? 'loading' : ''}>
                <h1 className='FormHeaderText'>Sign Up</h1>
                <Form.Input
                    label='Username'
                    placeholder='ilovenfts'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors.username ? true : false}
                />
                <Form.Input
                    label='Email'
                    placeholder='pepe@communft.xyz'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email ? true : false}
                />
                <Form.Input
                    label='Password'
                    type='password'
                    placeholder='wittyNFTreference1!'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password ? true : false}
                />
                <Form.Input
                    label='Confirm Password'
                    type='password'
                    placeholder='wittyNFTreference1!'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword ? true : false}
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
                <p>Already have an account? <a href='/login'>Login</a></p>
            </div>
        </div>
    )
};

export default SignUpWidget;