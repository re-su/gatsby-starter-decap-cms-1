import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

import facebookIcon from "../img/social/facebook.svg";
import instagramIcon from "../img/social/instagram.svg";
import phoneIcon from "../img/icons/phone.svg";
import locationIcon from "../img/icons/location.svg";
import emailIcon from "../img/icons/email.svg";

export const ContactPageTemplate = ({ title, phone, email, address, facebook, instagram, content, contentComponent, helmet }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">
      {helmet || ""}
      <h2 className="title is-size-3 has-text-weight-bold">{title}</h2>
      <div className="container">
        <div className="contact-page-contact-section">
          <h3 className="title is-size-4">Napisz lub zadzwoń</h3>
          <div className="contact-page-contact-box">
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="contact-page-contact-item">
              <img src={phoneIcon} alt="Phone" />
              <p>{phone}</p>
            </a>
            <a href={`mailto:${email}`} className="contact-page-contact-item">
              <img src={emailIcon} alt="Email" />
              <p>{email}</p>
            </a>
          </div>
          <h3 className="title is-size-4">Gdzie odbywają się zajęcia?</h3>
          <div className="contact-page-address-box">
            <p className="contact-page-address-box-header">
              <img src={locationIcon} alt="Location" />
            </p>
            <p>{address}</p>
          </div>
          <h3 className="title is-size-4">Odwiedź nasze media społecznościowe</h3>
          <div className="contact-page-social-links">
            <a href={facebook} target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="Facebook" /> Facebook</a>
            <a href={instagram} target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="Instagram icon" /> Instagram</a>
          </div>
          <PageContent className="content" content={content} />
        </div>
      </div>
    </section>
  );
};

ContactPageTemplate.propTypes = {
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  facebook: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactPageTemplate
        title={post.frontmatter.title}
        phone={post.frontmatter.phone}
        email={post.frontmatter.email}
        address={post.frontmatter.address}
        facebook={post.frontmatter.facebook}
        instagram={post.frontmatter.instagram}
        contentComponent={HTMLContent}
        content={post.html}
        helmet={
          <Helmet titleTemplate="%s | Fragaria - szkoła językowa Lubsko">
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        phone
        email
        address
        facebook
        instagram
      }
    }
  }
`;
