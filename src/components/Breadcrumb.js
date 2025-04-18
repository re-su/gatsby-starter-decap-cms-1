import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const Breadcrumb = ({ separator = "›", rootLabel = "Strona główna" }) => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const IS_INDEX_PAGE = typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "");

  const breadcrumbs = [
    { path: "/", label: rootLabel },
    ...segments.map((segment, i) => {
      const path = "/" + segments.slice(0, i + 1).join("/");
      const label = decodeURIComponent(segment).replace(/-/g, " ");
      return { path, label };
    }),
  ];

  return (
    IS_INDEX_PAGE ? <></> :
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return (
            <li key={crumb.path}>
              {isLast ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.path}>{crumb.label}</Link>
                  <span className="separator" aria-hidden="true">
                    {separator}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
