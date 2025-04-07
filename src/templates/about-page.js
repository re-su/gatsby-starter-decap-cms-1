import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const AboutPageTemplate = ({ title, content, contentComponent, teachers }) => {
  const PageContent = contentComponent || Content;
  return (
    <section className="section">
      <h2 className="title is-size-3 has-text-weight-bold">{title}</h2>
      <div className="container">
        <div className="about-content">
          <PageContent className="content" content={content} />
        </div>
        <div className="teachers">
          {teachers.map((teacher) => {
            return (
              <div key={teacher.name} className="teacher-box">
                {/* Use GatsbyImage to render the image */}
                {!teacher.photo.childImageSharp ? (
                  <img src={teacher.photo.url} alt={teacher.name} className="teacher-photo" />
                ) : (
                  <GatsbyImage image={getImage(teacher.photo.childImageSharp.gatsbyImageData)} alt={teacher.name} className="teacher-photo" />
                )}
                <div className="teacher-info">
                  <h3 className="title is-size-4">{teacher.name}</h3>
                  <p className="teacher-role">{teacher.role}</p>
                  <p>{teacher.bio}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  teachers: PropTypes.array.isRequired,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        teachers={post.frontmatter.teachers}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        teachers {
          name
          role
          bio
          photo {
            childImageSharp {
              gatsbyImageData(width: 150, height: 150, quality: 90)
            }
            publicURL
          }
        }
      }
    }
  }
`;
