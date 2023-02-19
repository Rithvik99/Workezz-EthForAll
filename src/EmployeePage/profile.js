import mail from '../Assets/mail.svg';
import './profile.css';
import jazzicon from "@metamask/jazzicon";
import { useRef} from 'react';


const Profile = ({ account, name, email, totalGigs, activeGigs }) => {
  const avatarRef = useRef();
  const element = avatarRef.current;
  if (element && account) {
    const addr = account.slice(2, 10);
    const seed = parseInt(addr, 16);
    const icon = jazzicon(50, seed); //generates a size 20 icon
    if (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    element.appendChild(icon);
  }

  return (<div>
    <div className='back'>
      <div className='profilepic'>
        {/* <img src={photo} alt={name} style={{ width: '100%', height: '100%' }} /> */}
        <div ref={avatarRef}></div>

      </div>
      <div style={{ textAlign: 'center', marginTop: '5%' }}>
        <p style={{ fontWeight: 'bold', color: '#69Dee6' }}>{name}</p>
        <hr className='line' />
        <div style={{ alignItems: 'start', display: 'flex' }}>
          <span>
            <img src={mail} alt="mail icon" />
          </span>
          <span>
            <p style={{ color: 'white', paddingLeft: '5%' }}>{email}</p>
          </span>
        </div>
        <hr className='line' />
      </div>
      <div className='gigs'>
        <div style={{ textAlign: 'center', marginRight: '30px' }}>
          <div style={{ color: 'white', fontSize: '10px' }}>Total Gigs</div>
          <p style={{ color: '#69dee6', fontWeight: 'bold', textAlign: 'center' }}>{totalGigs}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'white', fontSize: '10px' }}>Active Gigs</div>
          <p style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{activeGigs}</p>
        </div>
      </div>
    </div>
  </div>);
}
export default Profile;
