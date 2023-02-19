import React, { Component } from 'react';
import './CategoryNav.css';
import JobCard from './JobCard';
import { jobABI, jobAddress, userABI, userAddress } from '../Jsons/Contracts';
const Web3 = require("web3");

class CategoryNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedButton: "Graphics & design",
            recs : []
        };
        console.log(this.state.selectedButton)
    }

    handleButtonClick = (index) => {
        console.log(index)
        this.displayJobs(index);

    }
    async componentDidMount() {
        this.displayJobs("Graphics & design");
    }


    displayJobs = async (category)  => {
        let provider = window.ethereum;
        var web3 = new Web3(provider)
        const accounts = await web3.eth.getAccounts();

        const contractJobs = new web3.eth.Contract(jobABI, jobAddress);

        const recoms =
            await contractJobs.methods.GetRecommendations([category]).call({ from: accounts[0] });

        let k = [];
        for(let i=0;i<recoms.length;i++){
            if (recoms[i]!=69) {
            k.push(recoms[i]);        
            }
        }
        this.setState({recs:k,selectedButton:category});
    }
    
    render() {
        let catJobs = this.state.recs.map((jobindex) => <JobCard jobIndex={jobindex} key={jobindex} />);
    
        return (
            <div >
                <div className="navContainer">
                    <button
                        className={` ${this.state.selectedButton == 'Graphics & design' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Graphics & design")}
                    >
                        Graphics & Design
                    </button>
                    <button
                        className={` ${this.state.selectedButton == 'Digital Marketing' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Digital Marketing")}
                    >
                        Digital Marketing
                    </button>
                    <button
                        className={` ${this.state.selectedButton == 'Music & audio' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Music & audio")}
                    >
                        Music & Audio
                    </button>
                    <button
                        className={` ${this.state.selectedButton == 'Video & animations' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Video & animations")}
                    >
                        Video & Animation
                    </button>
                    <button
                        className={` ${this.state.selectedButton == 'Programming and tech' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Programming and tech")}
                    >
                        Programming & Tech
                    </button>
                    <button
                        className={` ${this.state.selectedButton == 'Business' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Business")}
                    >
                        Business
                    </button>
                    <button
                        className={` ${this.state.selectedButton == 'Writing and translation' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Writing and translation")}
                    >
                        Writing & Translation
                    </button>
                    <button
                        className={` ${this.state.selectedButton == 'Lifestyle' ? "navButtonActive" : "navButton"}`}
                        onClick={() => this.handleButtonClick("Lifestyle")}
                    >
                        Lifestyle
                    </button>
                </div>
                <div className='jobscontainer'>
                    {catJobs}
                </div>
            </div>
        );
    }
}

export default CategoryNav;
