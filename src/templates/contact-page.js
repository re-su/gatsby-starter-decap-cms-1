import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";

// eslint-disable-next-line
export const ContactPageTemplate = ({ title, desc, content, contentComponent, menutest }) => {
  const PageContent = contentComponent || Content;

  return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>{title}</h1>
            <p>{desc}</p>
            <PageContent content={content} />
            <ContactForm display={true} />
          </div>
        </div>
      </section>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        desc={post.frontmatter.desc}
        menutest={post.frontmatter.menutest}
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
        desc
        menutest
      }
    }
  }
`;
