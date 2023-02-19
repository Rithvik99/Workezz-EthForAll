import React, { Component } from 'react';
import './Employee.css';
import Topnav from './Topnav';
import Profile from './profile';
import Welcome from './welcome';
import Recommended from './Recomended';
import copy from '../Assets/Icons/Copyrights text.svg'
import linkedinOutline from '../Assets/Icons/linkedin_grey.svg';
import facebookOutline from '../Assets/Icons/facebook_grey.svg';
import instaOutline from '../Assets/Icons/instagram_grey.svg';
import twitterOutline from '../Assets/Icons/twitter_grey.svg';
import globeOutline from '../Assets/Icons/globe_grey.svg';
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';

const Web3 = require("web3");

class Employee extends Component {
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
      applied: [],
      previous: [],
      recommendedJobs: []
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
      await contractJobs.methods.GetRecommendations(category).call({ from: accounts[0] })

    let k = [];
    for (let i = 0; i < recoms.length; i++) {
      if (recoms[i] != 69) {
        if ((await contractJobs.methods.getOwner(recoms[i]).call({ from: accounts[0] })) != accounts[0]) {
          k.push(recoms[i]);
        }
      }
    }

    this.setState({ account: accounts[0], name: name, mail: mail, mobile: mobile, country: country, github: github, category: category, flag: flag, active: active, applied: applied, previous: previous, recommendedJobs: k })
  }

  render() {

    let reccJobs = this.state.recommendedJobs.map((jobindex) => <Recommended jobIndex={jobindex} valid={true} key={jobindex} />);
    let activeJobs = this.state.active.map((jobindex) => <Recommended jobIndex={jobindex} valid={false} key={jobindex} />);
    let pastJobs = this.state.previous.map((jobindex) => <Recommended jobIndex={jobindex} valid={false} key={jobindex} />);
    return (
      <div>
        <Topnav />
        <div style={{ margin: '1%', display: 'flex', flexDirection: 'column', overflowY: 'scroll', height: '90vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Profile
              account={this.state.account}
              name={this.state.name}
              email={this.state.mail}
              totalGigs={this.state.previous.length}
              activeGigs={this.state.active.length}
            />
            <Welcome name={this.state.name} />
          </div>
          <div className='recommendedBack'>
            <h1 className='recommendedText'>Recommended Jobs</h1>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {reccJobs}
            </div>
          </div>
          <div className='recommendedBack'>
            <h1 className='recommendedText'>Active Jobs</h1>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {activeJobs}
            </div>
          </div>

          <div className='recommendedBack'>
            <h1 className='recommendedText'>Previous Jobs</h1>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {pastJobs}
            </div>
          </div>

          <div className='adContainer'>
            <div style={{ display: "flex", overflowX: 'auto', minHeight: '100%' }}>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px' }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px'  }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px' }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
              <div style={{ minWidth: '100%', backgroundColor: '#69dee6 ', marginRight: '30px',marginTop:'10px', borderRadius: '10px',paddingTop:'30px',paddingLeft:'20px' }}>
                <h1 style={{ fontSize: '300%' }}> Advertise yourself</h1>
                <p style={{ fontSize: '150%' }}> With Workezz</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
            <p style={{ color: 'gray', fontSize: '200%', fontWeight: 'bold' }}>Workezz.</p>
            <img style={{ color: 'gray', fontSize: '100%', paddingLeft: '5%' }} src={copy}></img>
            <img style={{ marginLeft: '62%' }} src={facebookOutline} alt='fb'></img>
            <img style={{ marginLeft: '1%' }} src={linkedinOutline} alt='li'></img>
            <img style={{ marginLeft: '1%' }} src={instaOutline} alt='in'></img>
            <img style={{ marginLeft: '1%' }} src={twitterOutline} alt='tw'></img>
            <img style={{ marginLeft: '1%' }} src={globeOutline} alt='glc'></img>
          </div>
        </div>
      </div>
    );
  }
}


export default Employee