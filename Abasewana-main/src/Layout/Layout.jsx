import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import { univara } from '../assets';
// import { MdBoy, MdConstruction } from 'react-icons/md'
// import { LuConstruction } from 'react-icons/lu'
function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <div className="credit">
        Copyright Ⓒ 2024 Ambasewana. All Rights Reserved.
        <div>
          Crafted by Univara 2024
          <img src="../assets/univara.jpg" alt="img" />
        </div>
      </div>
    </div>
  );
}

export default Layout;
