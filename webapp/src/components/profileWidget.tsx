import React, { useState } from 'react';
import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum:any;
    }
}
// SETUP REPOSITORY BEFORE GOING ANY FURTHER
const Profile = () => {
    const [metamaskFeedback, setMetamaskFeedback] = useState('');
    const [metamaskAddys, addMetamaskAddress] = React.useState<string[]>([]);

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
            } else {
                setMetamaskFeedback(`Address ${address} is already in your profile.`);
            }
          } catch (err: any) {
            setMetamaskFeedback(err.message);
          }
    };

    return (
        <div>
            <p>To connect a different wallet disconnect all current wallets (they will not be removed from your profile).</p>
            <button onClick={handleMetamaskClick}>Connect metamask wallet</button>
            {metamaskFeedback !== '' && <p>{metamaskFeedback}</p>}
            <p>Your current Metamask addresses:</p>
            {metamaskAddys.map((address: string) => <p key={address}>{address}</p>)}
        </div>
    )
};

export default Profile;
