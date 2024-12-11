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
    const pageMap = {};

    // Build a map of pages for quick lookup
    pages.forEach(({ node }) => {
      const { path, title } = node.frontmatter;

      const segments = path.split("/").filter(Boolean); // Split path and filter empty segments
      const parentPath = `/${segments.slice(0, -1).join("/")}` || "/"; // Get parent path
      const currentPath = `/${segments.join("/")}`; // Get current path
      console.log(segments, parentPath, currentPath);
      if (!pageMap[currentPath] || !pageMap[currentPath].path || !pageMap[currentPath].title) {
        pageMap[currentPath] = null;
        pageMap[currentPath] = { title, path: currentPath, children: [] };
        console.log(1);
      }

      if (parentPath !== "/" && pageMap[parentPath]) {
        pageMap[parentPath].children.push(pageMap[currentPath]);
        console.log(2);
      } else if (parentPath !== "/" && !pageMap[parentPath]) {
        pageMap[parentPath] = { children: [pageMap[currentPath]] };
        console.log(3);
      }
      console.log("=======================================")
    });

    console.log(pageMap);

    // Return only root-level pages
    return Object.values(pageMap).filter(
      (page) =>
        !pages.some(({ node }) =>
          page && page.path &&
          page.path.startsWith(node.frontmatter.path) &&
          page.path !== node.frontmatter.path
        )
    );
  };

  // Function to render nested menu items
  const renderMenu = (menuItems) => {
    return menuItems.map(({ title, path, children }) => (
      <div key={path} className="navbar-item has-dropdown is-hoverable">
        <Link to={path} className={children && children.length > 0 ? "navbar-link" : "navbar-item"}>
          {capitalize(title)}
        </Link>
        {children && children.length > 0 && (
          <div className="navbar-dropdown is-hoverable">
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
  console.log(organizedPages)

  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="dropdown navigation">
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
