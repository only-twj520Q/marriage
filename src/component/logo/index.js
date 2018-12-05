import React from 'react';
import logoImg from '../../common/image/logo.png';
import './index.css';

function Logo() {
  return (
    <div className="logo-container">
      <img className="logo-img" src={logoImg} alt="logo展示"/>
    </div>
  )
}

export default Logo;
