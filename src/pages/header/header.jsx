import React from 'react';
import Logo from '../../components/logo/logo.jsx'
import ButtonHamburger from '../../components/buttonHamburger/buttonHamburger.jsx'
import './header.css';

const Header = () =>{
  return(
    <div className='header'>
      <div className='header-logo'>
        <Logo/>
      </div>

      <div className='header-search'>
        <input className='search-input' type="text" />
        <button className='search-button'>найти</button>
      </div>

      <div className='header-hamburgerButton'>
        <ButtonHamburger/>
      </div>
    </div>
  );
}
export default Header;