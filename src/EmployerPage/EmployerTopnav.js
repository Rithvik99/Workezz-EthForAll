import React, { Component, useState,createRef } from "react";
import "./EmployerTopnav.css";
import bell from '../Assets/bell.svg';
import briefcase from "../Assets/briefcase.svg"
import { Link } from 'react-router-dom';
import Notifications from "../EmployeePage/Notifications";
import jazzicon from "@metamask/jazzicon";

const Web3 = require("web3");

class EmployerTopnav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false, // new state to show/hide the popup
      account: ''
    };
    this.popupRef = createRef(); // create ref for the popup
    this.avatarRef = createRef();
  }


  handleNotificationClick = () => {
    this.setState({ showPopup: true });
  };

  handlePopupClose = () => {
    this.setState({ showPopup: false });
  };

  handleOutsideClick = (event) => {
    if (this.popupRef.current && !this.popupRef.current.contains(event.target)) {
      this.setState({ showPopup: false });
    }
  }

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick); // add event listener on mount
    let provider = window.ethereum;
    var web3 = new Web3(provider)
    const accounts = await web3.eth.getAccounts();
    this.setState({account : accounts[0]})
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick); // remove event listener on unmount
  }


  render() {
    const element = this.avatarRef.current;
    if (element && this.state.account) {
      const addr = this.state.account.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon = jazzicon(50, seed); //generates a size 20 icon
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }

    return (
      <div style={{ display: "flex", justifyContent: "left", alignItems: "center",borderBottom: "solid white 2px",paddingBottom:'1%',marginBottom:'2%' }}>
        <Link to='/employer'>
            <button style={{ backgroundColor: 'transparent', border: 'none' }}>
              <b style={{ fontSize: '200%', color: "white" }}>Work</b>
              <b style={{ fontSize: '200%', color: "#69DEE6" }}>ezz.</b>
            </button>
          </Link>
        <div style={{ marginLeft: "80%",marginRight:'1%'}}>
          <button style={{
            backgroundColor: "#272727",
            border: "none",
            color: "#69DEE6",
          }} onClick={this.handleStatusChange}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div >
                <Link to='/employee'>
                <button style={{backgroundColor:'#272727',color:'#69dee6',border:'none'}}> Employer</button>
                </Link>
              </div>
            </div>
          </button>
        </div>
        <button className="empnotification" onClick={this.handleNotificationClick}>
          <img src={bell} />
        </button>
        <button className="empprofile">
          {/* <img src={briefcase} /> */}
          <div ref={this.avatarRef} />
          <div style={{
            width: "10px",
            height: "10px",
            backgroundColor: "green",
            borderRadius: "50%",
            position: "absolute",
            bottom: "0",
            right: "0"
          }}></div>
        </button>
        {this.state.showPopup && (
          <div ref={this.popupRef} className="empnotPopup">
            <Notifications/>
          </div>
        )}
      </div>
    )
  }
}

export default EmployerTopnav;
