import React from "react";
import { Link } from "gatsby";

const NavbarMenu = ({ menuItems }) => {
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const renderMenu = (items) =>
    items.map(({ title, path, children }) => (
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

  return <div className="navbar-start">{renderMenu(menuItems)}</div>;
};

export default NavbarMenu;