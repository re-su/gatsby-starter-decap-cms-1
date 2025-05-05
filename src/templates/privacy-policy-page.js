import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const PrivacyPolicyPageTemplate = ({ title, content, contentComponent, helmet }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <h2 className="title is-size-3 has-text-weight-bold">{title}</h2>
      <div className="container">
        <div className="privacy-policy-content">
          <PageContent className="content" content={content} />
        </div>
      </div>
    </section>
  );
};

PrivacyPolicyPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const PrivacyPolicyPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <PrivacyPolicyPageTemplate
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Fragaria - szkoła językowa Lubsko">
            <title>Polityka Prywatności</title>
          </Helmet>
        }
      />
    </Layout>
  );
};

PrivacyPolicyPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PrivacyPolicyPage;

export const privacyPolicyPageQuery = graphql`
  query PrivacyPolicyPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;