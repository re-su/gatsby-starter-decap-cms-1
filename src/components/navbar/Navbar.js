import React, { useState, useEffect } from "react";
import NavbarBrand from "./NavbarBrand";
import NavbarMenu from "./NavbarMenu";
import useScrollBehavior from "./useSetNavigationBackground";
import { useStaticQuery, graphql } from "gatsby";
import { organizePages } from "../../utils/organizePages";
import useScrollVHThreshold from "../../hooks/useScrollVHThreshhold";
import useSetNavigationTop from "./useSetNavigationTop";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const IS_INDEX_PAGE = typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "");
  const navTop = useSetNavigationTop();
  var backgroundColorValue = useScrollBehavior(IS_INDEX_PAGE);
  var isScrolled = useScrollVHThreshold(0);

  const toggleMenu = () => setIsActive(!isActive);

  const data = graphql`
    query NavbarQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { regex: "/^(?!.*index-page).*page$/" }
          }
        }
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              path
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `;

  const pages = organizePages(data.allMarkdownRemark.edges);

  return (
    <nav id="navbar" className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation" style={{ textAlign: "center", top: navTop, transition: "top 0.3s, background-color 1s", backgroundColor: backgroundColorValue }}>
      <div className="container">
        {/* NavbarBrand with Logo and Burger */}
        <NavbarBrand isActive={isActive} toggleMenu={toggleMenu} isIndexPage={IS_INDEX_PAGE} />

        {/* Navbar Menu */}
        <div id="navMenu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <NavbarMenu menuItems={pages} />
          <a href={"/zapisy"} className={"navBtnLink desktop-nav-button"} style={{ width: `200px`}}><button className="navigation-btn navbar-burge">Zapisz się</button></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

