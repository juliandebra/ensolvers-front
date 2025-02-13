import React, { useEffect, useState } from "react";
import { footer, image, hidden } from "../Styles/Footer.module.css";
import tOLogo from "../assets/typeorm.svg";
import nestLogo from "../assets/nestjs.svg";
import react from "../assets/vite.svg";
import pgLogo from "../assets/pg-logo.svg";
const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <div className={`${footer} ${isVisible ? "" : hidden}`}>
      <h4>This application is build with </h4>
      <img className={image} src={nestLogo} alt="Nest.js" />
      <img className={image} src={react} alt="Vite" />
      <img className={image} src={tOLogo} alt="TypeORM" />
      <img className={image} src={pgLogo} alt="PostgreSQL" />
    </div>
  );
};

export default Footer;
