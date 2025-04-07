import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
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
    <footer className="footer-container">
      <div className="footer-content">
        <nav className="footer-nav">
        <h2 className="footer-title">FRAGARIA SCHOOL</h2>
          {pages.map(({ title, path, children }) => (
            <Link key={path} to={path}>{title}</Link>
          ))}
        </nav>
        <div className="footer-contact">
          <div className="contact-item">
            <img src={phoneIcon} alt="Phone" className="contact-icon" />
            <span>783 - 271 - 463</span>
          </div>
          <div className="contact-item">
            <img src={locationIcon} alt="Location" className="contact-icon" />
            <span>Tu będzie adres</span>
          </div>
          <div className="contact-item social-icons">
            <a href="https://facebook.com"><img src={facebookIcon} alt="Facebook" className="social-icon" /></a>
            <a href="https://instagram.com"><img src={instagramIcon} alt="Instagram" className="social-icon" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
