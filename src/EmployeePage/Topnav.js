import React, { Component,createRef } from "react";
import "./Topnav.css";
import bell from '../Assets/bell.svg';
import briefcase from "../Assets/briefcase.svg"
import { Link } from 'react-router-dom';
import Notifications from "./Notifications";
import jazzicon from "@metamask/jazzicon";

const Web3 = require("web3");

class Topnav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false, // new state to show/hide the popup
      account : ''

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
      <div style={{ display: "flex", justifyContent: "left", alignItems: "center", borderBottom: "solid white 2px", paddingBottom: '1%', marginBottom: '2%' ,marginTop:'0.5%'}}>
        <div style={{ paddingLeft: '1%' }}>
          <b style={{ fontSize: '200%', color: "white" }}>Work</b>
          <b style={{ fontSize: '200%', color: "#69DEE6" }}>ezz.</b>
        </div>
        <div style={{ marginLeft: "75%", width: "5%" }}>
          <button style={{
            backgroundColor: "#272727",
            border: "none",
            color: "#69DEE6",
          }} onClick={this.handleStatusChange}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div >
                <Link to='/employer'>
                  <button style={{ backgroundColor: '#272727', color: '#69dee6', border: 'none' }}> Employee</button>
                </Link>
              </div>
            </div>
          </button>
        </div>
        <button className="notification" onClick={this.handleNotificationClick}>
          <img src={bell} />
        </button>
        <Link to='/employee/jobs'>
          <button className="notification">
            <img src={briefcase} />
          </button>
        </Link>
        <button className="profile">
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
          <div ref={this.popupRef} className="notPopup">
            <Notifications />
          </div>
        )}
      </div>
    )
  }
}

export default Topnav;
