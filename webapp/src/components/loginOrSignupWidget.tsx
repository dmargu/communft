import React from 'react';
import './components.css'

//make an interface for the props for two functions setSignupVisible and setLoginVisible
interface Props {
    setSignUpVisible: () => void;
    setLoginVisible: () => void;
}   

const loginOrSignupWidget = (props: Props) => {
    return (
        <div>
            <h2>Welcome to Communft, sign in to add wallets to your account</h2>
            <div className='LoginSignupWidgetContainer'>
                <button onClick={props.setSignUpVisible}>Sign Up</button>
                <button onClick={props.setLoginVisible}>Login</button>
            </div>
        </div>
    );
};

export default loginOrSignupWidget;