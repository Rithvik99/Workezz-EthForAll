import React, { Component } from 'react'
import EmployerProfile from './EmployerProfile'
import EmployerTopnav from './EmployerTopnav'
import Welcome from '../EmployeePage/welcome'
import Recommended from '../EmployeePage/Recomended';
import "./Employeer.css"
import linkedinOutline from '../Assets/Icons/linkedin_grey.svg';
import facebookOutline from '../Assets/Icons/facebook_grey.svg';
import instaOutline from '../Assets/Icons/instagram_grey.svg';
import twitterOutline from '../Assets/Icons/twitter_grey.svg';
import globeOutline from '../Assets/Icons/globe_grey.svg';
import { Link } from 'react-router-dom';
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';

const Web3 = require("web3");

class Employer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            name: '',
            mail: '',
            mobile: '',
            country: '',
            github: '',
            category: [],
            flag: false,
            active: [],
            posted: [],
            previous: []
        }
    }
    async componentDidMount() {
        let provider = window.ethereum;
        var web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();

        const contractUsers = new web3.eth.Contract(userABI, userAddress);
        const contractJobs = new web3.eth.Contract(jobABI, jobAddress);
        const [name, mail, mobile, country, github, category, flag, active, applied, previous] =
            await contractUsers.methods.GetData().call({ from: accounts[0] })

        const recoms =
            await contractJobs.methods.getAllJobs().call({ from: accounts[0] });

        console.log(recoms);

        let act = [];
        let pos = [];
        let prev = [];
        for (let i = 0; i < recoms.length; i++) {
            let aStat = await contractJobs.methods.getActiveStatus(recoms[i]).call({ from: accounts[0] })
            let rStat = await contractJobs.methods.getRenderStatus(recoms[i]).call({ from: accounts[0] })
            if (aStat == false && rStat == true) {
                pos.push(recoms[i]);
            }
            else if (aStat == true && rStat == true) {
                act.push(recoms[i]);
            }
            else if (aStat == true && rStat == false) {
                prev.push(recoms[i]);
            }
        }

        this.setState({ account: accounts[0], name: name, mail: mail, mobile: mobile, country: country, github: github, category: category, flag: flag, active: act, posted: pos, previous: prev })
    }
    render() {
        let activeJobs = this.state.active.map((jobindex) => <Recommended jobIndex={jobindex} key={jobindex} />);
        let postedJobs = this.state.posted.map((jobindex) => <Recommended jobIndex={jobindex} key={jobindex} />);
        let previousJobs = this.state.previous.map((jobindex) => <Recommended jobIndex={jobindex} key={jobindex} />);
        return (
            <div>
                <div style={{ margin: '1%', display: 'flex', flexDirection: 'column', overflowY: 'scroll', height: '100vh' }}>
                    <EmployerTopnav />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EmployerProfile
                            account={this.state.account}
                            name={this.state.name}
                            email={this.state.mail}
                            totalGigs={this.state.previous.length}
                            activeGigs={this.state.active.length}
                        />
                        <Welcome name={this.state.name} />
                    </div>
                    <div className='recommendedBack'>
                        <div style={{ display: 'flex', alignItems: 'center', minWidth: '100%' }}>
                            <h1 className='recommendedText' >Active Jobs</h1>
                            <Link to='/employer/postjob'>
                                <button className='postjob'>
                                    Add Job
                                </button>
                            </Link>
                        </div>
                        <div style={{ display: 'flex', overflowX: 'auto' }}>
                            {activeJobs}
                        </div>
                    </div>
                    <div className='recommendedBack'>
                        <h1 className='recommendedText'>Posted Jobs</h1>
                        <div style={{ display: 'flex', overflowX: 'auto' }}>
                            {postedJobs}
                        </div>
                    </div>
                    <div className='recommendedBack'>
                        <h1 className='recommendedText'>Previous Jobs</h1>
                        <div style={{ display: 'flex', overflowX: 'auto' }}>
                            {previousJobs}
                        </div>
                    </div>
                    <div className='adContainer'>
                        <div style={{ display: "flex", overflowX: 'auto', minHeight: '100%' }}>
                            <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px', marginTop: '10px', borderRadius: '10px', paddingTop: '30px', paddingLeft: '20px' }}>
                                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                                <p style={{ fontSize: '150%' }}> With Workezz</p>
                            </div>
                            <div style={{ minWidth: '100%', backgroundColor: '#69dee6', marginRight: '30px', marginTop: '10px', borderRadius: '10px', paddingTop: '30px', paddingLeft: '20px' }}>
                                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                                <p style={{ fontSize: '150%' }}> With Workezz</p>
                            </div>
                            <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px', marginTop: '10px', borderRadius: '10px', paddingTop: '30px', paddingLeft: '20px' }}>
                                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                                <p style={{ fontSize: '150%' }}> With Workezz</p>
                            </div>
                            <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px', marginTop: '10px', borderRadius: '10px', paddingTop: '30px', paddingLeft: '20px' }}>
                                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                                <p style={{ fontSize: '150%' }}> With Workezz</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
                        <p style={{ color: 'gray', fontSize: '200%', fontWeight: 'bold' }}>Workezz.</p>
                        <p style={{ color: 'gray', fontSize: '100%', paddingLeft: '5%' }}>@ Workezz international ltd.2023</p>
                        <img style={{ marginLeft: '63%' }} src={facebookOutline} alt='fb'></img>
                        <img style={{ marginLeft: '1%' }} src={linkedinOutline} alt='li'></img>
                        <img style={{ marginLeft: '1%' }} src={instaOutline} alt='in'></img>
                        <img style={{ marginLeft: '1%' }} src={twitterOutline} alt='tw'></img>
                        <img style={{ marginLeft: '1%' }} src={globeOutline} alt='glc'></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Employer