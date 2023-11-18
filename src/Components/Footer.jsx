import React from 'react'
import {footer, image} from '../Styles/Footer.module.css'
import seqLogo from '../assets/sequelize-logo.svg'
import nodeLogo from '../assets/node-logo.png'
import react from '../assets/react.svg'
import pgLogo from '../assets/pg-logo.svg'
const Footer = () => {
  return (
    <div className={footer}>
      <h4>This application is build with </h4>
      <img className={image} src={nodeLogo} alt=""  />
      <img className={image} src={react} alt="" />
      <img className={image} src={seqLogo} alt=""  />
      <img className={image} src={pgLogo} alt="" />
    </div>
  )
}

export default Footer