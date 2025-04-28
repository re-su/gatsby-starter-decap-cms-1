import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import logo from "../img/logo.svg";
import { useLocation } from "@reach/router";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(typeof window !== "undefined" ? window.pageYOffset : 0);
  const { pathname } = useLocation();
  const IS_INDEX_PAGE = pathname === "/";

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const navbar = document.getElementById("navbar");
      if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0"; // Show the navbar
      } else if(currentScrollPos > 200) {
        navbar.style.top = "-60px"; // Hide the navbar
      }

      if (currentScrollPos <= 10 && prevScrollPos > 10) {
        navbar.style.backgroundColor = "rgba(164, 226, 255, 0)";
      } else if (currentScrollPos > 10 && prevScrollPos <= 10) {
        navbar.style.backgroundColor = "rgba(164, 226, 255, 1)";
      }

      setPrevScrollPos(currentScrollPos);
    };

    const handleLoad = () => {
      const currentScrollPos = window.pageYOffset;
      if(currentScrollPos <= 10) {
        document.getElementById("navbar").style.backgroundColor = "rgba(164, 226, 255, 0)"
      }
    }

    if(IS_INDEX_PAGE) {
      window.addEventListener("scroll", handleScroll);
      handleLoad();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

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

  const pages = data.allMarkdownRemark.edges;

  const capitalize = (string) =>
    string ? string.charAt(0).toUpperCase() + string.slice(1) : "";

  // Function to organize pages into a nested structure
  const organizePages = (pages) => {
    const pageMap = {};

    // Build a map of pages for quick lookup
    pages.forEach(({ node }) => {
      const slug = node.fields.slug;
      const path = node.frontmatter.path ? node.frontmatter.path : slug;
      const title = node.frontmatter.title;

      const segments = path.split("/").filter(Boolean);
      const parentPath = `/${segments.slice(0, -1).join("/")}` || "/";
      const currentPath = `/${segments.join("/")}`;      

      if (!pageMap[currentPath] || !pageMap[currentPath].path || !pageMap[currentPath].title) {
        pageMap[currentPath] = null;
        pageMap[currentPath] = { title, path: currentPath, children: [] };
      }

      if (parentPath !== "/" && pageMap[parentPath]) {
        pageMap[parentPath].children.push(pageMap[currentPath]);
      } else if (parentPath !== "/" && !pageMap[parentPath]) {
        pageMap[parentPath] = { children: [pageMap[currentPath]] };
      }

    });

    return Object.values(pageMap).filter(
      (page) =>
        !pages.some(({ node }) =>
          page.path &&
          page.path.startsWith(node.frontmatter.path) &&
          page.path !== node.frontmatter.path
        )
    );
  };

  const renderMenu = (menuItems) => {
    return menuItems.map(({ title, path, children }) => (
      <div key={path} className="navbar-item has-dropdown is-hoverable">
        <Link
          to={path}
          className={children && children.length > 0 ? "navbar-link" : "navbar-item"}
        >
          {capitalize(title)}
        </Link>
        {children && children.length > 0 && (
          <div className="navbar-dropdown is-boxed">
            {children.map((child) => (
              <Link key={child.path} to={child.path} className="navbar-item">
                {capitalize(child.title)}
              </Link>
            ))}
          </div>
        )}
      </div>
    ));
  };

  const organizedPages = organizePages(pages);

  return (
    <nav
      id="navbar"
      className={`navbar is-fixed-top`}
      role="navigation"
      aria-label="main navigation"
      style={{
        transition: "top 0.3s, background-color 1s"
      }}
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Site Logo" style={{ width: "88px" }} />
          </Link>
          <button
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div id="navMenu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          <div className="navbar-start">{renderMenu(organizedPages)}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
