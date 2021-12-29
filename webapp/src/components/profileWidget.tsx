import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from 'semantic-ui-react';
import { IoMdRemoveCircle } from 'react-icons/io';
import { AuthContext } from '../context/Auth';
import { ADD_WALLET, DELETE_WALLET } from '../graphql/Mutations';
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

const Profile = () => { //fix add/delete wallet after state update and add all of the loading conditions
    const { logout } = useContext(AuthContext);
    const [metamaskFeedback, setMetamaskFeedback] = useState('');
    const [connectSuccess, setConnectSuccess] = useState(false);


    const userRes = useQuery(GET_USER); //should eventually add { skip } here and only query once and then update cache... the effect isn't working though so leaving it out for now
    console.log('new use res', userRes);

    const [addWalletAddress, addWalletRes] = useMutation(ADD_WALLET, {
        onCompleted: (data: any) => {
            setMetamaskFeedback(`Wallet successfully added to your profile.`);
            setConnectSuccess(true);
        },
        onError: (err: any) => {
            setMetamaskFeedback(`${err.message}`);
            setConnectSuccess(false);
        }
    });

    const [deleteWalletAddress, deleteWalletRes] = useMutation(DELETE_WALLET, {
        onCompleted: (data: any) => {
            setMetamaskFeedback(`Wallet successfully deleted from your profile.`);
            setConnectSuccess(true);
        },
        onError: (err: any) => {
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

    const handleWalletDelete = (address: String) => {
        const shouldDel = window.confirm(`Are you sure you want to delete wallet ${address} from your profile?`);
        if (shouldDel) {
            deleteWalletAddress({ variables: { walletAddress: address } });
        }
    }

    return (
        <div className="ProfileContainer">
            <h1 className='TextDown'>Wallet Manager</h1>
            {(userRes.loading || addWalletRes.loading || deleteWalletRes.loading) &&
                <h1>Loading...</h1> 
            }
            {userRes.data &&
                <div>
                    <h4>Current Metamask addresses:</h4>
                    {userRes.data.getUser.connectedWallets.map((wallet: Wallet) =>
                        <div className='FieldContainer'> 
                            <p key={wallet.walletAddress}>{wallet.walletAddress}</p>
                            <div className='ButtonLeft'>
                                <IoMdRemoveCircle 
                                    onClick={() => handleWalletDelete(wallet.walletAddress)}
                                    size='20px'
                                    color='red'
                                />
                            </div>
                        </div>
                    )}
                    {metamaskFeedback !== '' && connectSuccess && <p className='GreenText'>{metamaskFeedback}</p>}
                    {metamaskFeedback !== '' && !connectSuccess && <p className='RedText'>{metamaskFeedback}</p>}
                    <div className='PaddingDown'>
                        <Button primary onClick={handleMetamaskClick} className='ButtonRadius'>Connect Metamask wallet</Button>
                    </div>
                    <div className='NotesContainer'>
                        <h1>Notes</h1>
                        <ul>
                            <li>
                                <p>We currently only support Metamask wallets. If you use a different one you would like integrated please contact us in discord.</p>
                            </li>
                            <li>
                                <p className='TextDown'>If you are struggling to connect a different wallet, disconnect all current wallets (they will not be removed from your profile).</p>
                            </li>
                        </ul>
                    </div>
                    <div className='FieldContainerBetween'>
                        <h4 className='TextDown'>Logged in as {userRes.data.getUser.username}</h4>
                        <Button onClick={logout}>Log Out</Button>
                    </div>
                </div>
            }
            {userRes.error &&
                <div>
                    <h4>Error: {userRes.error.message}</h4>
                </div> 
            }
        </div>
    )
};

export default Profile;
