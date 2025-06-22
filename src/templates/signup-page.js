import * as React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout"
// eslint-disable-next-line
export const CourseSignupPageTemplate = ({
  title,
  desc,
  content,
  contentComponent,
  courses, // Add courses prop to be passed
  helmet
}) => {
  const PageContent = contentComponent || HTMLContent;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container">
        <div className="content">
          <h1>{title}</h1>
          <p>{desc}</p>
          <PageContent content={content} />
          <ContactForm display={true} courses={courses} /> {/* Pass courses here */}
        </div>
      </div>
    </section>
  );
};

CourseSignupPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  courses: PropTypes.array.isRequired, // Define that we expect an array of courses
};

const CourseSignupPage = ({ data }) => {
  const { markdownRemark: post } = data;

  // Assuming you also want courses data, you can fetch them via GraphQL:
  const courses = data.allMarkdownRemark.edges.map(edge => ({
    id: edge.node.id,
    title: edge.node.frontmatter.title,
    isBlocked: edge.node.frontmatter.isBlocked
  }));

  return (
    <Layout>
      <CourseSignupPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        desc={post.frontmatter.desc}
        courses={courses}
        helmet={
          <Helmet titleTemplate="%s | Fragaria - szkoła językowa Lubsko">
            <title>Zapisy</title>
          </Helmet>
        }
      />
    </Layout>
  );
};

CourseSignupPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CourseSignupPage;

export const courseSignupPageQuery = graphql`
  query CourseSignupPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        menutest
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "course-page" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            isBlocked
          }
        }
      }
    }
  }
`;
