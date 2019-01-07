import React from 'react';
import './index.css';

function Logo() {
  return (
    <div className="logo-container">
      <img className="logo-img" src={require('../../common/image/logo.png')} alt="logo展示"/>
    </div>
  )
}

export default Logo;
