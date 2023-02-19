import React, { Component } from 'react'
import EmployerTopnav from '../EmployerPage/EmployerTopnav'
import './Postjob.css'
import camera from '../Assets/Icons/camera 1.svg'
import CatApply from '../EmployerPage/CatApply'
import { Navigate } from 'react-router-dom'
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';
import {storeFiles,retrieve} from '../Web3Storage/imageoperation';
const Web3 = require('web3');

class Postjob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            jobDescription: '',
            imageSrc: camera,
            imageFlag : false,
            imageFile : null,
            pay: '',
            duration: '',
            filename: '',
            positions: '',
            deadline: '',
            category: [],
            postStat: false
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleCategoryChange = (selectedCategories) => {
        this.setState({ category: selectedCategories });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleImageChange = (e) => {
        this.state.filename = e.target.files[0]['name'];
        this.setState({imageFile: e.target.files[0],imageSrc : URL.createObjectURL(e.target.files[0]),imageFlag : true})
    }

    handleSubmit = (event) => {
        event.preventDefault()

    }

    addJob = async () => {
        let provider = window.ethereum;
        if (typeof provider !== "undefined") {
            var web3 = new Web3(provider)
            
            //Accounts
            const accounts = await web3.eth.getAccounts();

            //Contracts
            const contractUsers = new web3.eth.Contract(userABI, userAddress);
            const contractJobs = new web3.eth.Contract(jobABI, jobAddress);
            
            //Storing Profile Pic
            let cid = await storeFiles(this.state.imageFile);
            console.log(this.state.filename);
            await contractJobs.methods.pushD(this.state.jobDescription, this.state.category,cid,this.state.filename,this.state.pay,this.state.duration,this.state.jobTitle).send({ from: accounts[0] });
            console.log(await contractJobs.methods.getAllJobs().call({ from: accounts[0] }))
            this.setState({ postStat: true });
        }
    }



    render() {
        console.log(this.state.category)
        return (
            <div style={{ marginInline: '1%' }}>
                <EmployerTopnav />
                <p className='addgigtitle'>Add Gig</p>
                <div className='takeInputs'>
                    <form onSubmit={this.handleSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <div>
                                    <label>
                                        <input className='firstleft' type="text" placeholder='  Job Title' name="jobTitle" value={this.state.jobTitle} onChange={this.handleChange} />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <textarea className='secondleft' placeholder='  Job Description' name="jobDescription" value={this.state.jobDescription} onChange={this.handleChange} />
                                    </label>
                                </div>
                            </div>
                            <div style={{ marginLeft: '2vh' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'top', backgroundColor: '#383838',width: '50vh', height: '30vh' }}>
                                        <img style={{ display: 'flex', justifyContent: 'center',  }} src={this.state.imageSrc}></img>
                                    </div>
                                    { !this.state.imageFlag &&
                                    <p style={{ fontWeight: 'bold', color: 'black', display: 'flex', justifyContent: 'center', verticalAlign: 'top', backgroundColor: '#383838' }}>Add Image</p>
                                    }
                                    <div style={{ marginTop: '1vh', display: 'flex', justifyContent: 'center'}}>
                                        <label for='upload'>
                                            <input className='postinput' id='upload' placeholder='Image' type="file" name="image"  accept="image/*"
                                                onChange={this.handleImageChange} />
                                        </label>
                                    </div>

                                </div>
                                <div style={{ backgroundColor: '#383838', marginTop: '2vh', padding: '1vh', marginBottom: '2vh', paddingRight: '2vh' }}>
                                    <CatApply update={this.handleCategoryChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form">
                            <label >
                                <input className='thirdline' placeholder='  Pay' type="text" name="pay" value={this.state.pay} onChange={this.handleChange} />
                            </label>
                            <label>
                                <input className='thirdline' placeholder='  Duration' type="text" name="duration" value={this.state.duration} onChange={this.handleChange} />
                            </label>
                            <label>
                                <input className='thirdline' placeholder='  No of Positions' type="text" name="positions" value={this.state.positions} onChange={this.handleChange} />
                            </label>
                            <label>
                                <input className='thirdline' placeholder='  Deadline' type="text" name="deadline" value={this.state.deadline} onChange={this.handleChange} />
                            </label>
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: "4vh" }}>
                            <button style={{ color: 'black', fontWeight: 'bold', backgroundColor: '#69dee6', borderRadius: '10px', fontSize: '250%', width: '30vh' }} type="submit" onClick={() => this.addJob()}>Post</button>
                        </div>
                        {
                            this.state.postStat &&
                            <Navigate to='/employer'></Navigate>

                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default Postjob
