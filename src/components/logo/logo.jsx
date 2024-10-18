import React from 'react';
import { Link } from "react-router-dom";

import './logo.css';
const Logo = () =>{
  return(
    <Link to="/" className='logo'>
        <div className='logo-cube top-left'>G</div>
        <div className='logo-cube top-right'>A</div>
        <div className='logo-cube bottom-left'>M</div>
        <div className='logo-cube bottom-right'>E</div>
    </Link>
  );
}
export default Logo;