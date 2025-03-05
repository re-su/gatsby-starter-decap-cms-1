import React from "react";
import { Link } from "gatsby";
import logo from "../../img/logo2.svg";
import useScrollVHThreshold from "../../hooks/useScrollVHThreshhold";

const NavbarBrand = ({ isActive, toggleMenu, isIndexPage }) => {
  var showLogo = useScrollVHThreshold(70) || !isIndexPage;
  return (
    <div
      className="navbar-brand"
    >
      <Link to="/" title="Strona główna">
        <img 
          src={logo} 
          alt="Site Logo" 
          style={{ 
            opacity: showLogo ? "1" : "0",
            width: `50px`,
            height: `100%`,
            transition: 'opacity 0.5s'
          }}
        />
      </Link>
      <a href={"/zapisy"} className={"navBtnLink mobile-nav-button"} style={{ width: `200px`}}><button className="navigation-btn">Zapisz się</button></a>
      <button
        className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
        aria-expanded={isActive}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
};

export default NavbarBrand;