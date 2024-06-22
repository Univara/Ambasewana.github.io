import { Link } from 'react-router-dom'; // Make sure Link is imported if you're using it
import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import footer from '../assets/logo.png'; // Assuming you have a footer image to display

import './Styles/Footer.css';

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-list list-1">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ width: '100px', height: 'auto' }} // Adjust width as needed
            />
          </Link>
          <p>
            Welcome to Ambasewana, where the rich, aromatic flavors of India
            meet the bold, savory tastes of China.
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
      </div>
    </div>
  );
}

export default Footer;
