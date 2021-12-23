import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { useMutation, useQuery } from '@apollo/client';

import { AuthContext } from '../context/Auth';
import { ADD_WALLET } from '../graphql/Mutations';
import { GET_USER } from '../graphql/Queries';
import './components.css';

declare global {
    interface Window {
        ethereum:any;
    }
}

interface Wallet {
    walletAddress: string;
    walletProvider: string;
}

const Profile = () => {
    const { logout } = useContext(AuthContext);
    const [metamaskFeedback, setMetamaskFeedback] = useState('');
    const [connectSuccess, setConnectSuccess] = useState(false);

    const userRes = useQuery(GET_USER);

    const [addWalletAddress, { loading, error }] = useMutation(ADD_WALLET, {
        onCompleted: (data: any) => {
            setMetamaskFeedback(`Wallet successfully added to your profile.`);
            setConnectSuccess(true);
        },
        onError: (err: any) => {
            console.log('err', err);
            setMetamaskFeedback(`${err.message}`);
            setConnectSuccess(false);
        }
    });

    const message = 'Please sign this message so we know you own the wallet. We only save your public key with your profile.';
    const handleMetamaskClick = async () => {
        try {
            if (!window.ethereum)
              throw new Error('No Metamask wallet was found.');
        
            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            await signer.signMessage(message);
            const address = await signer.getAddress();
            
            //check if address is connected to user already, if not try to add it
            if (!userRes.data.getUser.connectedWallets.find((wallet: Wallet) => wallet.walletAddress === address)) {
                //run the mutation to add the wallet to the users connectedWallets
                addWalletAddress({ variables: { walletAddress: address, walletProvider: 'metamask' } });
                
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
            {userRes.data &&
                <div>
                    <p>To connect a different wallet, disconnect all current wallets (they will not be removed from your profile).</p>
                    <button onClick={handleMetamaskClick}>Connect metamask wallet</button>
                    {metamaskFeedback !== '' && connectSuccess && <p className='GreenText'>{metamaskFeedback}</p>}
                    {metamaskFeedback !== '' && !connectSuccess && <p className='RedText'>{metamaskFeedback}</p>}
                    <p>{userRes.data.getUser.username}'s current Metamask addresses:</p>
                    {userRes.data.getUser.connectedWallets.map((wallet: Wallet) => <p key={wallet.walletAddress}>{wallet.walletAddress}</p>)}
                    <button onClick={logout}>Log Out</button>
                </div>
            }
        </div>
    )
};

export default Profile;
