import React from 'react';
import Pattern from '../Assets/Pattern.svg';
import "./welcome.css"

const Welcome = ({ name }) => (
  <div className='welcomepattern' style={{ backgroundImage: `url(${Pattern})` }}>
    <div>
      <h1 style={{ color: 'black', marginLeft: '30px' }}>Hello, {name}!</h1>
    </div>
    <div>
      <p style={{ color: 'black', marginLeft: '30px' }}>Welcome to this dice world!</p>
    </div>
  </div>
);

export default Welcome;
