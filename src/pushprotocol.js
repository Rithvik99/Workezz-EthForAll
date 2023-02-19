import React, { useEffect, useState, Component,createRef,useRef } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import EmployerTopnav from '../EmployerPage/EmployerTopnav'
import './Closepost.css'
import jobphoto from '../Assets/Stock Images/image 4.png'
import profilephoto from '../Assets/Stock Images/img1.jpg'
import jazzicon from "@metamask/jazzicon";
import * as PushAPI from "@pushprotocol/restapi";


function sendmessage(signer,userid)
{
    const signer = new ethers.Wallet(`${process.env.NEXT_PUBLIC_PKEY}`);
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `Successfully selected for a gig`,
          body: `Congratulations you have been selected for a gig`,
        },
        payload: {
          title: `Successfully selected for a gig`,
          body: `Congratulations you have been selected for a gig`,
        },
        recipients: `eip155:5:`.concat(userid),
        channel: "eip155:5:0xDF1239659f9c2Eac3Fcf08469ADf278bb553A408",
        env: "staging",
      });
      
    } 
    
}

export default sendmessage;