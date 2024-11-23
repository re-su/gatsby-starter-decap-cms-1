import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import logo from "../img/logo.svg";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const data = useStaticQuery(graphql`
    query NavbarQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: {
            templateKey: { regex: "/page/" }
            path: { ne: null }
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
          }
        }
      }
    }
  `);

  const pages = data.allMarkdownRemark.edges;

  // Utility function to capitalize the first letter of a string
  const capitalize = (string) =>
    string ? string.charAt(0).toUpperCase() + string.slice(1) : "";

  // Function to organize pages into a nested structure
  const organizePages = (pages) => {
    const nestedPages = [];

    pages.forEach(({ node }) => {
      const { path, parentPath, title } = node.frontmatter;

      // Find the parent item and add the current page as a child
      if (parentPath) {
        const parent = nestedPages.find((item) => item.path === parentPath);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push({ title, path });
        }
      } else {
        // If no parentPath, this is a top-level item
        nestedPages.push({ title, path });
      }
    });

    return nestedPages;
  };

  // Function to render nested menu items
  const renderMenu = (menuItems) => {
    return menuItems.map(({ title, path, children }) => (
      <div key={path} className="navbar-item has-dropdown is-hoverable">
        <Link to={path} className="navbar-link">
          {capitalize(title)}
        </Link>
        {children && children.length > 0 && (
          <div className="navbar-dropdown">
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
    <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
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
          <div className="navbar-start">
            {renderMenu(organizedPages)} {/* Render the menu with nested pages */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
