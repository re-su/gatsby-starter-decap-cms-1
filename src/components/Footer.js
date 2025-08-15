import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import facebookIcon from "../img/social/facebook.svg";
import instagramIcon from "../img/social/instagram.svg";
import phoneIcon from "../img/icons/phone.svg";
import locationIcon from "../img/icons/location.svg";
import { organizePages } from "../utils/organizePages";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
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

  const { pathname: rawPathname } = useLocation();
  const pathname = decodeURIComponent(rawPathname);

  const isActive = (linkPath) => {
    const cleanPath = pathname.replace(/\/$/, "");
    const cleanLink = decodeURIComponent(linkPath).replace(/\/$/, "");
    return cleanPath === cleanLink;
  };

  const pages = organizePages(data.allMarkdownRemark.edges);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <nav className="footer-nav">
          <h2 className="footer-title">FRAGARIA SCHOOL</h2>
          {pages.map(({ title, path }) => (
            <Link
              key={path}
              to={path}
              className={isActive(path) ? "active" : ""}
              aria-current={isActive(path) ? "page" : undefined}
            >
              {title}
            </Link>
          ))}
          <Link
            key="/polityka-prywatności"
            to="/polityka-prywatności"
            className={isActive("/polityka-prywatności") ? "active" : ""}
            aria-current={isActive("/polityka-prywatności") ? "page" : undefined}
          >
            Polityka prywatności
          </Link>
        </nav>
        <div className="footer-contact">
          <div className="contact-item">
            <a href="tel:783271463" className="contact-item">
              <img src={phoneIcon} alt="Phone" className="contact-icon phone-icon" />
              <span>783 - 271 - 463</span>
            </a>
          </div>
          <div className="contact-item">
            <img src={locationIcon} alt="Location" className="contact-icon" />
            <span>Lubsko, Kopernika 32</span>
          </div>
          <div className="contact-item social-icons">
            <a href="https://www.facebook.com/fragariaschool">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/fragariaschool">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
