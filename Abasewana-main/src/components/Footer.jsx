import { footer } from '../assets';
import './Styles/Footer.css';
import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';
function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-list list-1">
          <h2 className="logo">Ambasewana.</h2>
          <p>
            Financial experts support or help you to to find out which way you
            can raise your funds more.
          </p>
          <div className="icons">
            <h2>
              <FaFacebookSquare />
            </h2>
            <h2>
              <FaInstagram />
            </h2>
            <h2>
              <FaTwitter />
            </h2>
            <h2>
              <FaPinterest />
            </h2>
          </div>
        </div>

        <div className="footer-list">
          <h2>Contact Info</h2>
          <p>+92 062 109-9222</p>
          <p>Info@YourGmail24.com</p>
          <p>153 Kottawa</p>
        </div>

        <div className="footer-list">
          <h2>Opening Hours</h2>
          <p>Monday-Friday: 08:00-22:00</p>
          <p>Tuesday 4PM: Till Mid Night</p>
          <p>Saturday: 10:00-16:00</p>
        </div>

        {/* <div className="footer-list">
          <h2>Branches </h2>
          <p>Monday-Friday: 08:00-22:00</p>
          <p>Tuesday 4PM: Till Mid Night</p>
          <p>Saturday: 10:00-16:00</p>
        </div> */}
      </div>
      <div className="footer-imgs">
        <img className="img-1" src={footer} />
        <div className="footer-line"></div>
      </div>

      {/* <div className='credit'>
                <MdConstruction />  Website Under Construction! <LuConstruction />
                </div> */}
    </div>
  );
}

export default Footer;
