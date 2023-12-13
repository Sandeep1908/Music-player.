import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { logo } from '../assets';
import { links } from '../assets/constants';
import {auth} from '../firebase'

const NavLiks = ({ handleClick }) => (
  <div className="mt-10">
    {links?.map((link) => (
      <NavLink
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
        key={link.name}
        to={link.to}
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname= useLocation().pathname
  console.log(pathname==='/login')
  return (
   <div className={`${pathname === '/login'? 'hidden':''} bg-[#191624]`}>
      <div className={`  md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]`}>
        <button onClick={()=>auth.signOut()} className='text-black rounded w-[150px] h-[50px] bg-white'>Logout</button>
        <NavLiks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`md:hidden absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLiks handleClick={() => setMobileMenuOpen(false)} />
      </div>
      </div>
  );
};

export default Sidebar;
