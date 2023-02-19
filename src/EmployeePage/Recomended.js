import React, { Component, createRef } from "react";
import plus from '../Assets/plus.svg';
import heart from '../Assets/heart.svg';
import './Recommended.css';
import { Link } from 'react-router-dom';
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';
import {storeFiles,retrieve} from '../Web3Storage/imageoperation';
import jazzicon from "@metamask/jazzicon";
const Web3 = require("web3");



class Recommended extends Component {
    constructor(props) {
        super(props);  
          
        this.state = {
            showMessage: false,
            showHeartMessage: false,
            jobPhoto:'',
            profilePhoto:'',
            company:'',
            jobDescription:'',
            isOwner:'/employee/jobs/readmore'
        };
        this.avatarRef = createRef();
    }

    handleHover = () => {
        this.setState({ showMessage: true });
    };

    handleLeave = () => {
        this.setState({ showMessage: false });
    };

    handleHeartHover = () => {
        this.setState({ showHeartMessage: true });
    };

    handleHeartLeave = () => {
        this.setState({ showHeartMessage: false });
    };

    async componentDidMount() {
        let provider = window.ethereum;
        var web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();
        
        const contractUsers = new web3.eth.Contract(userABI, userAddress);
        const contractJobs = new web3.eth.Contract(jobABI, jobAddress);
        const [ name, desc, pay, duration, tit] = 
        await contractJobs.methods.GetDispJob(this.props.jobIndex,userAddress).call({ from: accounts[0] })
        let [cid, address,filename] = await contractJobs.methods.getImageInfo(this.props.jobIndex).call({ from: accounts[0] });
        console.log(filename);
        let link = "https://".concat(cid,".ipfs.dweb.link/".concat(filename,""));
        this.setState({company:tit,jobDescription:desc,jobPhoto:link, profilePhoto: "0x".concat('', address) });

        if(await contractJobs.methods.getOwner(this.props.jobIndex).call({ from: accounts[0] }) == accounts[0]){
            this.setState({isOwner:'/employer/closepost'})
        }
    }

    render() {
        const element = this.avatarRef.current;
        if (element && this.state.profilePhoto) {
            const addr = this.state.profilePhoto.slice(2, 10);
            const seed = parseInt(addr, 16);
            const icon = jazzicon(35, seed); //generates a size 20 icon
            if (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(icon);
        }
        console.log(this.state.jobPhoto);
        return (
            <div className='recommendedContainer'>
                <img src={this.state.jobPhoto} style={{ width: '100%', height: '100px' }} />
                <div style={{ paddingRight: '5%' }}>
                    <div className='companyContainer'>
                        <div className='profilePhoto'>
                            {/* <img src={this.state.profilePhoto}  style={{ width: '100%', height: '100%' }} /> */}
                            <div ref={this.avatarRef} />
                        </div>
                        <p className='companyText'>
                            {this.state.company}
                        </p>
                    </div>
                    <p className='jobDescription'>
                        {this.state.jobDescription}
                    </p>
                    <div style={{ position: 'relative' }}>
                        <button
                            style={{ backgroundColor: 'black' }}
                            onMouseEnter={this.handleHover}
                            onMouseLeave={this.handleLeave}
                        >
                            <img src={plus} alt="plus" />
                        </button>
                        {this.state.showMessage && (
                            <div className='plusMessage'>
                                Save to List
                            </div>
                        )}

                        <button style={{ backgroundColor: 'black' }} onMouseEnter={this.handleHeartHover}
                            onMouseLeave={this.handleHeartLeave}><img src={heart} alt="like" />
                            {this.state.showHeartMessage && (
                                <div className='heartMessage'>
                                    Save to Priority List
                                </div>
                            )}
                        </button>
                        <Link to= {this.state.isOwner} state={{ jobIndex : this.props.jobIndex, valid : this.props.valid}}>
                            <button className='readMoreButton' >Read more</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recommended;



