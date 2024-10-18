import React from 'react';
import { Link } from "react-router-dom";

import Logo from '../../components/logo/logo.jsx'
import Discord from '../../components/social/discord.svg';
import Telegram from '../../components/social/telegram.svg';
import Vk from '../../components/social/vk.svg';

import './footer.css';
const Footer = () =>{
  return(
    <div className='footer'>
      <div className='footer-logo'>
        <Logo/>
      </div>
      <div className='footer-aboutUs'>
        <Link to="error" href="" className=''> сотрудничать с нами </Link>
        <Link to="error" href="" className=''> что нового</Link>
        <Link to="error" href="" className=''>3</Link>
        <Link to="error" href="" className=''>4</Link>
      </div>
      <div className='footer-social'>
        <a href=""><img className='footer-socialImg' src={Discord} alt="Discord" /></a>
        <a href=""><img className='footer-socialImg' src={Vk} alt="ВК" /></a>
        <a href=""><img className='footer-socialImg' src={Telegram} alt="Telegram" /></a>
      </div>
    </div>
  );
}
export default Footer;