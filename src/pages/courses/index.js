import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from '../../components/PreviewCompatibleImage'

const CourseListTemplate = ({ data }) => {
  const { edges: courses } = data.allMarkdownRemark;

  return (
    <div className="course-list">
      {courses.map(({ node: course }) => (
        <div className="course-item" key={course.id}>
          {course.frontmatter.featuredimage && (
            <div className="course-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image: course.frontmatter.featuredimage,
                  alt: `Featured image for ${course.frontmatter.title}`
                }}
              />
            </div>
          )}
          <div className="course-info">
            <h2>
              <Link to={course.fields.slug} className="course-title">
                {course.frontmatter.title}
              </Link>
            </h2>
            <p className="course-date">{course.frontmatter.date}</p>
            <p className="course-excerpt">{course.excerpt}</p>
            <Link className="primary-btn" to={course.fields.slug}>
              View Course →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

CourseListTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function CourseList() {
  return (
    <StaticQuery
      query={graphql`
        query CourseListQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "course" } } }
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
                  date(formatString: "MMMM DD, YYYY")
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 300
                        quality: 100
                        layout: CONSTRAINED
                      )
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => <CourseListTemplate data={data} />}
    />
  );
}
