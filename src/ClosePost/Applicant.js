import React, { Component, createRef, useState, useRef } from "react";
import decline from '../Assets/Icons/Decline.svg'
import accept from '../Assets/Icons/Accept.svg'
import './Closepost.css';
import { Link } from 'react-router-dom';
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';
import jazzicon from "@metamask/jazzicon";
import { storeFiles, retrieve } from '../Web3Storage/imageoperation';
import { useEffect } from "react";

const Web3 = require("web3");
const Applicant = ({ name, email, gigs, index, jobIndex, address }) => {
    let avatarRef = useRef();
    const [jobPhoto, setJobPhoto] = useState('');
    const [accounts, setAccount] = useState("");
    let acceptApplicant = async () => {
        let provider = window.ethereum;
        var web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();

        const contractUsers = new web3.eth.Contract(userABI, userAddress);
        const contractJobs = new web3.eth.Contract(jobABI, jobAddress);

        await contractUsers.methods.AcceptJob(index, jobIndex, jobAddress).send({ from: accounts[0] });
        let [cid, address, filename] = await contractJobs.methods.getImageInfo(jobIndex).call({ from: accounts[0] });
        console.log(filename);
        let link = "https://".concat(cid, ".ipfs.dweb.link/".concat(filename, ""));
        setJobPhoto(link);
        setAccount(accounts[0]);
    }

    useEffect(() => {
        const element = avatarRef.current;
        if (element && accounts) {
            const addr = accounts.slice(2, 10);
            const seed = parseInt(addr, 16);
            const icon = jazzicon(50, seed); //generates a size 20 icon
            if (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(icon);
        }
    }
    )

    console.log(accounts)
    return (
        <div style={{
            display: 'flex', alignItems: 'center', marginTop: '2%', marginLeft: '2%',
            width: '100%', backgroundColor: '#383838', height: '15vh', borderRadius: '5px'
        }}>
            <div className='closepostappphoto' ref={avatarRef}></div>
            <div>

                <p style={{ margin: '0', color: 'white', fontWeight: 'bold' }}>{name}</p>
                <p style={{ margin: '0', color: 'white' }}>{email}</p>
                <div style={{ display: 'flex' }}>
                    <p style={{ margin: '0', color: 'white' }}>Total Gigs: </p>
                    <p style={{ margin: '0', marginLeft: '1vh', color: '#69dee6', fontWeight: 'bold' }}>{gigs}</p>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: '5vh', marginLeft: '50vh' }}>
                <button style={{ background: 'none', border: 'none' }}>
                    <img style={{ width: '5vh', height: '5vh', marginInline: '1vh' }} src={decline}></img>
                </button>
                <Link to='/employer'>
                    <button style={{ background: 'none', border: 'none' }} onClick={() => acceptApplicant()}>
                        <img style={{ width: '5vh', height: '5vh', marginInline: '1vh' }} src={accept}></img>
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default Applicant;





