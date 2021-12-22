import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import './components.css';
declare global {
    interface Window {
        ethereum:any;
    }
}

const Profile = () => {
    const [metamaskFeedback, setMetamaskFeedback] = useState('');
    const [connectSuccess, setConnectSuccess] = useState(false);
    const [metamaskAddys, addMetamaskAddress] = React.useState<string[]>([]);

    const { loading, error, data } = useQuery(GET_MESSAGES);

    if (data) {
        console.log(data);
    }

    const message = 'Please sign this message so we know you own the wallet. We only save your public key with your profile.';

    const handleMetamaskClick = async () => {
        try {
            if (!window.ethereum)
              throw new Error("No Metamask wallet was found.");
        
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            await signer.signMessage(message);
            const address = await signer.getAddress();
            
            //check if address is in metamaskAddys, if not add it
            if (!metamaskAddys.includes(address)) {
                addMetamaskAddress([...metamaskAddys, address]);
                setMetamaskFeedback(`Address ${address} was successfully added to your profile.`);
                setConnectSuccess(true);
            } else {
                setMetamaskFeedback(`Address ${address} is already in your profile.`);
                setConnectSuccess(false);
            }
          } catch (err: any) {
            setMetamaskFeedback(err.message);
            setConnectSuccess(false);
          }
    };

    return (
        <div>
            {loading && <div><h1>Loading</h1></div>}
            {error && <div><h1>{error}</h1></div>}
            {data &&
                <div>
                    <p>To connect a different wallet disconnect all current wallets (they will not be removed from your profile).</p>
                    <button onClick={handleMetamaskClick}>Connect metamask wallet</button>
                    {metamaskFeedback !== '' && connectSuccess && <p className='GreenText'>{metamaskFeedback}</p>}
                    {metamaskFeedback !== '' && !connectSuccess && <p className='RedText'>{metamaskFeedback}</p>}
                    <p>Your current Metamask addresses:</p>
                    {metamaskAddys.map((address: string) => <p key={address}>{address}</p>)}
                    <ul>
                        {data.getMessages.map((message: any) => <li key={message.id}>{message.messageText}</li>)}
                    </ul>
                </div>
            }
        </div>
    )
};

export default Profile;
