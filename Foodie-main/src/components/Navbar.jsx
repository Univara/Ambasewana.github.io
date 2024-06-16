import { useState } from 'react';
import { navLinks } from '../constants';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CartState } from './Shop';
import { carticon } from '../assets';
import { FaTimes } from 'react-icons/fa';
import './Styles/Navbar.css';
import './Styles/Cart.css';
import Cart from './Cart';
// import { logo } from '../assets';

const Navbar = () => {
  const cart = useRecoilValue(CartState);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen((prevstate) => !prevstate);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close sidebar function
  };

  return (
    <header>
      <div className="nav-container container">
        <h4 className="logo">Ambasewana</h4>
        <div className="nav-container">
          <nav className={`site-nav ${isOpen ? 'site-nav--open' : ''}`}>
            <ul>
              {navLinks.map((nav) => (
                <li key={nav.id}>
                  <Link to={nav.link}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <div>
              <button onClick={toggleSidebar} className="cart-btn">
                <div className="cart">
                  <img src={carticon} alt="" width="30px" />
                  <p className="cart-value">{Object.keys(cart).length}</p>
                </div>
              </button>
              <aside
                className={`${
                  isSidebarOpen
                    ? 'sidebar show-sidebar'
                    : 'sidebar hide-sidebar'
                }`}
              >
                <div className="sidebar-header">
                  <h1>Cart</h1>
                  <button className="close-btn" onClick={toggleSidebar}>
                    <FaTimes />
                  </button>
                </div>
                <Cart closeSidebar={closeSidebar} />{' '}
                {/* Pass closeSidebar as prop */}
              </aside>
            </div>
          </div>
        </div>

        <div
          className={`menu-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleNav}
        >
          <div className="hamburger"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
