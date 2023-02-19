import "./popup.css"
import CategoryButtons from './CategoryButtons'
import { Link, Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import { userABI, userAddress } from '../Jsons/Contracts';

const Web3 = require('web3');

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      mail: '',
      mobile: '',
      country: '',
      github: '',
      category: [],
      created: false,
      errorPhrase: '',
      noError: true
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);


  }

  handleCategoryChange = (selectedCategories) => {
    this.setState({ category: selectedCategories });
  }

  handleChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value }
    )
  }

  handleSubmit = (event) => {

    event.preventDefault()
  }

  signupAction = async () => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      await provider.request({ method: "eth_requestAccounts" });
      var web3 = new Web3(provider)

      //Accounts
      const accounts = await web3.eth.getAccounts();

      //Contracts
      const contractUsers = new web3.eth.Contract(userABI, userAddress);

      //Access Control
      if (await contractUsers.methods.ValidateUser().call({from : accounts[0]})) {
        this.setState({ noError: false, errorPhrase: 'User Already Exists' });
      }
      else {
        const { name, mail, mobile, country, github, category } = this.state;
        await contractUsers.methods.AddUser(name, mail, mobile, country, github, category)
          .send({ from: accounts[0], gaslimit: 9000000000000 })
        this.setState({ created: true })
      }

    } else {
      this.setState({ noError: false, errorPhrase: 'MetaMask Wallet not found.' });
    }
  }



  render() {
    return (this.props.trigger) ? (
      <div className='popup'>
        <div className='popup-inner'>
          <div className='align'>
            <div>
              <h1 className='vertical' style={{ color: '#69DEE6', paddingLeft: '35%' }}> ezz.</h1>
              <h1 className='vertical' style={{ color: 'black', paddingRight: '30%' }}> Work</h1>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div ><text className='nogap' style={{ fontWeight: 'bolder', fontSize: "150%" }} >Create an account</text></div>
              <div><text className='nogap' style={{ fontSize: '80%' }} >Lets get started</text></div>
              <div className='twomargin'><input className="full" type="text" name='name' placeholder="Name " value={this.state.name} onChange={this.handleChange}></input></div>
              <div className='twomargin'><input className="full" type="text" name="mail" placeholder="Mail " value={this.state.mail} onChange={this.handleChange}></input></div>
              <div className='twomargin'>
                <input style={{ width: "47%", marginRight: "3%" }} type="text" name='mobile' placeholder="Mobile " value={this.state.mobile} onChange={this.handleChange}></input>
                <select style={{ width: "47%", paddingTop: '0.8%', paddingBottom: '0.8%' }} name='country' value={this.state.country} onChange={this.handleChange}>
                  <option value="India"> India </option>
                  <option value="Pakistan"> Pakistan </option>
                </select>
              </div>
              <div className='twomargin'><input className='full' type="text" name='github' placeholder="Github Username " value={this.state.github} onChange={this.handleChange}></input></div>
              <CategoryButtons classname='full-margin' update={this.handleCategoryChange}> </CategoryButtons>
              <div style={{ width: "150%" }}>
                <button className='submit-button' type='submit' onClick={() => this.signupAction()}>Create account</button>
              </div>
            </form>
            {
              this.state.created &&
              <Navigate to='/employee'></Navigate>

            }
            {!this.state.noError &&
              <b className='errortext'>{this.state.errorPhrase}</b>
            }
          </div>
        </div>
      </div>
    ) : "";
  }
}

export default Popup
