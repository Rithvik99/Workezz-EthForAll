import React, { Component, createRef } from 'react'
import './TopnavJobs.css'
import bell from '../Assets/bell.svg';
import briefcase from "../Assets/briefcase.svg"
import { Link } from 'react-router-dom';
import Notifications from '../EmployeePage/Notifications';

class TopnavJobs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPopup: false,
    };
    this.popupRef = createRef();
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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick); // add event listener on mount
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick); // remove event listener on unmount
  }

  render() {
    return (
      <div className='topNavJobsContainer'>
        <div style={{ paddingLeft: '1%' }}>
          <Link to='/employee'>
            <button style={{ backgroundColor: 'transparent', border: 'none' }}>
              <b style={{ fontSize: '200%', color: "white" }}>Work</b>
              <b style={{ fontSize: '200%', color: "#69DEE6" }}>ezz.</b>
            </button>
          </Link>
        </div>
        <div style={{ marginLeft: "78%", width: "5%" }}>
          <Link to='/employer'>
            <button style={{
              backgroundColor: "#272727",
              border: "none",
              color: "#69DEE6",
            }} >
              <div style={{ display: "flex", alignItems: "center", marginRight: "5px" }}>
                Employee
              </div>
            </button>
          </Link>
        </div>
        <button className="jobsnotification" onClick={this.handleNotificationClick}>
          <img src={bell} />
        </button>
        <button className="jobsprofile">
          <img src={briefcase} />
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
          <div ref={this.popupRef} className="jobsnotPopup">
            <Notifications />
          </div>
        )}
      </div>
    )
  }
}

export default TopnavJobs