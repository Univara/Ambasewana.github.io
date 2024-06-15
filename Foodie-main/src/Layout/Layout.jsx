import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
// import { MdBoy, MdConstruction } from 'react-icons/md'
// import { LuConstruction } from 'react-icons/lu'
function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <div className="credit">
        Copyright Ⓒ 2023 Ambasewana. All Rights Reserved.
        <div>Crafted by Univara 2024</div>
      </div>
    </div>
  );
}

export default Layout;
