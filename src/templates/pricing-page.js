import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import { getImage } from 'gatsby-plugin-image'
import { graphql, Link } from 'gatsby';

const PricingPageTemplate = ({ data }) => {
  const { edges: courses } = data.allMarkdownRemark;
  const pageTitle = data.markdownRemark.frontmatter.title

  return (
    <section className='section'>
      <h2 className='title is-size-3 has-text-weight-bold'>{pageTitle}</h2>
      <section className="pricing-page-container">
        {courses.map(({ node }) => {
          const {
            frontmatter: { title, cardheading, cardlist, featuredimage },
            fields: { slug },
          } = node;

          return (
            <div className="pricing-page-card" key={node.id}>
              <div className="pricing-page-card-content">
                <h2 className="pricing-page-card-title">{title}</h2>
                <p className="pricing-page-card-heading">{cardheading}</p>
                <ul className="pricing-page-card-details">
                  {cardlist.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <Link className="primary-btn" to={slug}>Zapisz się</Link>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

PricingPageTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

// The GraphQL page query that fetches the data at build time
const PricingPage = ({ data }) => {
  return (
    <Layout>
      <PricingPageTemplate data={data} />
    </Layout>
  );
};

PricingPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PricingPage;

export const pageQuery = graphql`
  query CourseListQuery($id: String!) {
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
            cardheading
            cardlist
            cardcolor
            featuredimage {
              childImageSharp {
                gatsbyImageData(width: 300, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }

    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
