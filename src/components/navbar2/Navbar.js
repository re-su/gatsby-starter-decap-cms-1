import React, { useState } from "react";
import logo from "../../img/logo2.svg";
import { Link, useStaticQuery, graphql } from "gatsby";
import useSetNavigationTop from "./useSetNavigationTop";
import useScrollBehavior from "./useSetNavigationBackground";
import useScrollVHThreshold from "../../hooks/useScrollVHThreshhold";
import { organizePages } from "../../utils/organizePages";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(true); // Controls mobile dropdown
  const IS_INDEX_PAGE = typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "");
  const IS_COURSE_PAGE = typeof window !== "undefined" && window.location.pathname.includes("/kursy/");
  const IS_SIGNUP_PAGE = typeof window !== "undefined" && window.location.pathname.includes("/zapisy");
  const navTop = useSetNavigationTop();
  const backgroundColorValue = useScrollBehavior(IS_INDEX_PAGE || IS_COURSE_PAGE);
  const showLogo = useScrollVHThreshold(70) || !IS_INDEX_PAGE || menuOpen;

  // GraphQL query to fetch dynamic pages
  const data = useStaticQuery(graphql`
query NavbarQuery {
  allMarkdownRemark(
    filter: {frontmatter: {templateKey: {regex: "/^(?!.*index-page).*page$/"}}}
    sort: {fields: frontmatter___title, order: ASC}
  ) {
    edges {
      node {
        frontmatter {
          title
          path
          nav
          navigationpriority
        }
        fields {
          slug
        }
      }
    }
  }
}

  `);

  const pages = organizePages(data.allMarkdownRemark.edges);

  return (
    <nav 
        className="custom-nav"
        style={{ top: navTop, transition: "top 0.3s, background-color 1s", backgroundColor: backgroundColorValue }}
    >
      <div className="nav-logo">
        <Link to="/" title="Strona główna">
          <img 
            src={logo} 
            alt="Site Logo" 
            style={{ 
                opacity: showLogo ? "1" : "0",
                width: menuOpen ? "100px" : "50px",
                height: "100%",
                transition: "all 0.5s",
            }}
          />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="nav-links">
        {pages.map(({ title, path, children }) => (
          <div key={path} className="dropdown-parent">
            <Link to={path} className={`nav-item`} title={title}>
              {title} {children && children.length > 0 && (<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z"/></svg>)}
            </Link>
            {children && children.length > 0 && (
              <div className="nav-dropdown">
                {children.map((child) => (
                  <Link key={child.path} to={child.path} title={child.title} className={`dropdown-link`}>
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Signup Button */}
      {IS_COURSE_PAGE || IS_SIGNUP_PAGE ? <Link className="signup-btn" to="/courses">Pełna oferta</Link> : <Link className="signup-btn" to="/zapisy">Zapisz się</Link>}
    
      {/* Mobile Menu Toggle */}
      <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar top"></div>
        <div className="bar middle"></div>
        <div className="bar bottom"></div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "slide-in" : "slide-out"}`}>
        <div className="mobile-menu-content">
          {pages.map(({ title, path, children }) => (
            <div key={path} className="mobile-dropdown">
              <div className="mobile-item">
                <Link key={path} to={path}>{title}</Link> {children && children.length > 0 && (<svg onClick={() => setDropdownOpen(!dropdownOpen)} className={dropdownOpen ? "arrow-icon rotated" : ""} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff000"><path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z"/></svg>)}
              </div>
              {children && children.length > 0 && (
                <div className={`mobile-dropdown-content ${dropdownOpen ? "open" : "closed"}`}>
                  {children.map((child) => (
                    <Link key={child.path} to={child.path} className="mobile-dropdown-item">
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
