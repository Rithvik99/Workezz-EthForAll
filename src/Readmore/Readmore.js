import React, { useState, useEffect, createRef } from 'react'
import TopnavJobs from '../Employeejob/TopnavJobs'
import './Readmore.css'
import pro from '../Assets/Stock Images/img1.jpg'
import like from '../Assets/Icons/heart.svg'
import search from '../Assets/Icons/search.svg'
import job from '../Assets/Stock Images/image 4.png'
import { Navigate, useLocation } from 'react-router-dom'
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';
import { storeFiles, retrieve } from '../Web3Storage/imageoperation';
import jazzicon from "@metamask/jazzicon";
const Web3 = require("web3");
function Readmore() {
    const location = useLocation()
    const { jobIndex } = location.state

    const [showConfirmationDialog, setConfimation] = useState(false);
    const [applied, setApplied] = useState(false);
    const [company, setCompany] = useState('');
    const [jobDescription, setjobDescription] = useState('');
    const [pay, setPay] = useState('');
    const [tit, setTit] = useState('');
    const [duration, setDuration] = useState('');
    const [jobPhoto, setJobPhoto] = useState('');
    const [amIApp, setApp] = useState(false)
    let avatarRef = createRef();

    let moon = async () => {
        setConfimation(false)
        setApplied(true)
        let provider = window.ethereum;
        var web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();

        const contractUsers = new web3.eth.Contract(userABI, userAddress);
        const contractJobs = new web3.eth.Contract(jobABI, jobAddress);

        await contractUsers.methods.ApplyJob(jobIndex, jobAddress).send({ from: accounts[0] })
        setApp(await contractJobs.methods.amIApplicant(accounts[0], jobIndex));

    };

    let read = async () => {
        let provider = window.ethereum;
        var web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();

        const contractUsers = new web3.eth.Contract(userABI, userAddress);
        const contractJobs = new web3.eth.Contract(jobABI, jobAddress);

        const [name, desc, pay, duration,tit] =
            await contractJobs.methods.GetDispJob(jobIndex, userAddress).call({ from: accounts[0] })
        setApp(await contractJobs.methods.amIApplicant(accounts[0], jobIndex).call({from:accounts[0]}));
        //console.log(jobIndex);

        setCompany(name);
        setjobDescription(desc);
        setPay(pay);
        setDuration(duration);
        setTit(tit)
        let [cid, address, filename] = await contractJobs.methods.getImageInfo(jobIndex).call({ from: accounts[0] });
        console.log(filename);
        let link = "https://".concat(cid, ".ipfs.dweb.link/".concat(filename, ""));
        setJobPhoto(link);
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

    useEffect(() => {
        read()
    });
    console.log(jobPhoto);
    return (
        <div>
            <TopnavJobs />
            <div className='readmoreback'>
                <h1 className='readmoreTitle'>{tit} </h1>
                <div className='readmoreSecLine'>
                    <div className='readmoreprofilePhoto'>
                        {/* <img src={pro} /> */}.
                        <div ref={avatarRef} />
                    </div>
                    {
                        applied && <Navigate to='/employee/jobs'></Navigate>
                    }
                    <div style={{ fontWeight: 'bold', marginLeft: '1%' }}>
                        {company}
                    </div>
                    <img style={{ marginLeft: '83%' }} src={like} />
                    <img style={{ marginLeft: '1%' }} src={search} />
                </div>
                <div className='readmoreThirdLine'>
                    <p style={{ width: '50%' }}>
                        {jobDescription}
                    </p>
                    {/* <img src={job} style={{ width: '40%', marginLeft: '5%' }} /> */}
                    <img src={jobPhoto} style={{ width: '30%', marginLeft: '5%' }} />
                </div>
                <div style={{ display: 'flex', marginTop: '2%', marginInline: '3%', alignItems: 'center' }} >
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10%' }}>
                        <p style={{ margin: 0 }}> Price:</p>
                        <p style={{ fontWeight: 'bold', fontSize: '150%', margin: 0 }}>{pay}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10%' }}>
                        <p style={{ margin: 0 }}> Duration:</p>
                        <p style={{ fontWeight: 'bold', fontSize: '150%', margin: 0 }}> {duration}</p>
                    </div>
                    {!amIApp &&
                        <button className='readmoreApply' onClick={() => setConfimation(true)}>
                            <h1 style={{ fontWeight: 'bold', fontSize: '150%' }}>Apply</h1>
                        </button>
                    }
                </div>
            </div>

            {showConfirmationDialog &&
                <div className="confirmationPopup">
                    <div>
                        <h2>Do you want to apply?</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <button onClick={() => moon()}>Yes</button>

                            <button onClick={() => setConfimation(false)}>No</button>
                        </div>


                    </div>
                </div>
            }



        </div>
    )
}

export default Readmore

