import React, { Component, createRef } from "react";
import plus from '../Assets/plus.svg';
import heart from '../Assets/heart.svg';
import "./JobCard.css";
import { Link } from 'react-router-dom';
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';
import jazzicon from "@metamask/jazzicon";
import {storeFiles,retrieve} from '../Web3Storage/imageoperation';

const Web3 = require("web3");

class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            showHeartMessage: false,
            showMoreInfo: false,
            jobPhoto: '',
            profilePhoto: '',
            company: '',
            jobDescription: '',
            tit: ''
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
        const [name, desc, pay, duration, tit] =
            await contractJobs.methods.GetDispJob(this.props.jobIndex, userAddress).call({ from: accounts[0] })
        let [cid, address,filename] = await contractJobs.methods.getImageInfo(this.props.jobIndex).call({ from: accounts[0] });
        console.log(filename);
        let link = "https://".concat(cid,".ipfs.dweb.link/".concat(filename,""));
        this.setState({ company: name, jobDescription: desc, jobPhoto: link, tit: tit,profilePhoto: "0x".concat('', address) });
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
            <div className='jobCardContainer'>

                <img src= {this.state.jobPhoto}  className={this.state.showMoreInfo ? 'jobPhoto jobPhotoBig' : 'jobPhoto'} />
                <div className='jobinfo'>
                    <div className='firstLine'>
                        <div className='jobprofilePhoto'>
                            {/* <img src={this.state.profilePhoto} alt={this.state.profilePhoto} style={{ width: '100%', height: '100%' }} /> */}
                            <div ref={this.avatarRef} />
                        </div>
                        <p className='companyText'>
                            {this.state.tit}
                        </p>
                    </div>

                    <p className='secondLine' >
                        {this.state.jobDescription}
                    </p>
                    <div className='buttonContainer'>
                        <div style={{ display: "flex", position: "relative", justifyContent: "flex-start" }}>

                            <button style={{ background: "none", border: "none", margin: "none" }} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave}>
                                <img src={plus} alt="plus" />
                                {this.state.showMessage && <div className='jobcardplusMessage' >Add to list</div>}
                            </button>
                            <button style={{ backgroundColor: 'black' }} onMouseEnter={this.handleHeartHover}
                                onMouseLeave={this.handleHeartLeave}><img src={heart} alt="like" />
                                {this.state.showHeartMessage && (
                                    <div className='jobcardheartMessage'>
                                        Save to Priority List
                                    </div>
                                )}
                            </button>
                            <div style={{ marginLeft: '65%' }}>
                                <Link to='/employee/jobs/readmore' state = {{jobIndex: this.props.jobIndex}}>
                                    <button style={{ borderRadius: "10%", fontSize: "80%", background: "none", borderColor: "white", color: "white" }}>
                                        Read more
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default JobCard