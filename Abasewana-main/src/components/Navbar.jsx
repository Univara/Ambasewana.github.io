import { useState } from "react";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CartState } from "./Shop";
import { carticon } from "../assets";
import { FaTimes } from "react-icons/fa";
import "./Styles/Navbar.css";
import "./Styles/Cart.css";
import Cart from "./Cart";
import logo from "../assets/logo.png";

const Navbar = () => {
  const cart = useRecoilValue(CartState);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // Initialize tableNumber state
  const tableNumber = localStorage.getItem("tableNumber");

  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close sidebar function
  };
  console.log(tableNumber);
  return (
    <header>
      <div className="nav-container container">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ width: "100px", height: "auto" }} // Adjust width as needed
            />
          </Link>
        

        <div className="nav-container">
          <nav className={`site-nav ${isOpen ? "site-nav--open" : ""}`}>
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
                    ? "sidebar show-sidebar"
                    : "sidebar hide-sidebar"
                }`}
              >
                <div className="sidebar-header">
                  <h1>Cart</h1>
                  <button className="close-btn" onClick={toggleSidebar}>
                    <FaTimes />
                  </button>
                </div>
                <Cart
                  closeSidebar={closeSidebar}
                  tableNumber={tableNumber} // Pass the tableNumber prop
                />
              </aside>
            </div>
          </div>
        </div>

        <div
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={toggleNav}
        >
          <div className="hamburger"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
