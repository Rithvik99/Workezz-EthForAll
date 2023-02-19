import React, { Component } from 'react';
import './Notifications.css'
import bell from '../Assets/Icons/bell.svg'
import nobell from '../Assets/Icons/bell-off 2.svg'
class Notifications extends Component {
    render() {
        const { count, notifications, profilePhoto } = this.props;

        if (count === 0) {
            return (
                <div style={{ color: 'white' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid white', padding: '3%' }}>
                        <img style={{ fill: 'white', marginInline: '2%' }} src={bell}></img>
                        <div style={{ fontSize: '100%' }}>Notifications ({count})</div>
                    </div>
                    <div style={{display: 'flex',flexDirection:'column', alignItems: 'center', color:'gray',marginTop:'10%'}}>
                        <img style={{width: '50%', height: '50%'}} src={nobell}></img>
                        No Notifications

                    </div>
                </div>
            );
        }

        return (
            <div style={{ color: 'white' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid white', padding: '3%' }}>
                    <img style={{ fill: 'white', marginInline: '2%' }} src={bell}></img>
                    <div style={{ fontSize: '100%' }}>Notifications ({count})</div>
                </div>
                {notifications.map((notification, index) => (
                    <div style={{ marginTop: '5%', display: 'flex', alignItems: 'center' }} key={index}>
                        <img className='notProfile' src={profilePhoto[index]} alt="profile" />
                        {notification}
                    </div>
                ))}
            </div>
        );
    }
}

Notifications.defaultProps = {
    count: 0,
    notifications: ['Hi,You have been selected for this job.please find the attached doc.',
        'Hi,You have been selected for this job.please find the attached doc.',
        'Hi,You have been selected for this job.please find the attached doc.',
        'Hi,You have been selected for this job.please find the attached doc.',
        'Hi,You have been selected for this job.please find the attached doc.'],
    profilePhoto: ['https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80'],
};

export default Notifications;
