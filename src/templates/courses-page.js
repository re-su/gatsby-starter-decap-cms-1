import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const CourseListTemplate = ({ data }) => {
  const { edges: courses } = data.allMarkdownRemark;

  return (
    <section className="section">
      <h2 className="title is-size-3 has-text-weight-bold">Kursy</h2>
      <div className="course-list">
        {courses
          .sort((a, b) => {
            const priorityA = a.node.frontmatter.navigationpriority ?? 0;
            const priorityB = b.node.frontmatter.navigationpriority ?? 0;
            return priorityA - priorityB;
          })
          .map(({ node: course }) => (
            <div
              className="course-item"
              key={course.id}
              style={{ borderLeft: `5px solid ${course.frontmatter.color || '#007acc'}` }}
            >
              {course.frontmatter.featuredimage && (
                <div className="course-thumbnail">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: course.frontmatter.featuredimage,
                      alt: `Featured image for ${course.frontmatter.title}`,
                    }}
                  />
                </div>
              )}
              <div className="course-info">
                <h2>
                  <Link to={course.fields.slug.replace(/\/$/, '')} className="course-title">
                    {course.frontmatter.title}
                  </Link>
                </h2>
                <p className="course-excerpt">{course.excerpt}</p>
                <Link className="primary-btn" to={course.fields.slug.replace(/\/$/, '')}>
                  Zobacz kurs →
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

CourseListTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

const CourseListPage = ({ data }) => {
  return (
    <Layout>
      <CourseListTemplate data={data} />
    </Layout>
  );
};

CourseListPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CourseListPage;

export const pageQuery = graphql`
  query CourseListQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "course-page" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 150)
          fields {
            slug
          }
          frontmatter {
            title
            color
            navigationpriority
            featuredimage {
              childImageSharp {
                gatsbyImageData(width: 300, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
