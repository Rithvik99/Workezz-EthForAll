import React, { Component } from 'react'
import './homepage.css';
import Popup from './popup'
import { Link, Route, Navigate } from 'react-router-dom';
import { userABI,userAddress } from '../Jsons/Contracts';


const Web3 = require("web3");
class HomePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            account: '',
            buttonpopup: false,
            noError: true,
            errorPhrase: '',
            login: false
        }
    }

    setbuttonpopup = () => (this.setState({ buttonpopup: true }))

    loginAction = async () => {
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
            await provider.request({ method: "eth_requestAccounts" });
            var web3 = new Web3(provider)

            //Accounts
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            //Contracts
            const contractUsers = new web3.eth.Contract(userABI, userAddress);

            //Access Control
            if (await contractUsers.methods.ValidateUser().call({from : account})) {
                this.setState({ login: true });
            }
            else {
                this.setState({ noError: false, errorPhrase: 'User not Registered.Pilla Puvva' });
            }

        } else {
            this.setState({ noError: false, errorPhrase: 'MetaMask Wallet not found.' });
        }
    }

    render() {
        return (
            <div>
                {
                    // Circle Shrink-Fade Animation 
                }
                <div className='circle'></div>

                <div className='prompt'>

                    {
                        // Logo 
                    }

                    <div className='logo'>
                        <b id='logohead'>Work</b>
                        <b>ezz.</b>
                    </div>

                    {
                        //Signup Button
                    }

                    <div className='signup'>
                        {!this.state.buttonpopup ?
                            <button className='signupbutton'
                                onClick={() => this.setbuttonpopup()}>
                                Create with Metamask
                            </button>
                            :
                            <Popup trigger={this.state.buttonpopup}
                                setTrigger={this.setbuttonpopup}>
                            </Popup>
                        }
                    </div>

                    {
                        //Login Button
                    }

                    <div className='login'>
                        <div className='logintext'>Already have an account?</div>
                        <button className='loginbutton' onClick={() => this.loginAction()}>Login</button>
                    </div>

                    {
                        this.state.login && 
                        <Navigate to = '/employee'></Navigate>

                    }

                    {!this.state.noError &&
                        <b className='login errortext'>{this.state.errorPhrase}</b>
                    }

                </div>
            </div>
        )
    }
}

export default HomePage