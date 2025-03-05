import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import FeaturesSection from '../components/FeaturesSection';
import SimpleInfoBox from '../components/SimpleInfoBox';
import MainPageBanner from '../components/MainPageBanner';
import GroupCourses from '../components/GroupCourses'
import IndividualCourses from '../components/IndividualCourses';

export const IndexPageTemplate = ({ image, heading, description, courses, individualCourses, features, sampleInfoBox }) => {
  const heroImage = getImage(image) || image;

  useEffect(() => {
    if (typeof window !== "undefined" && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
      window.netlifyIdentity.init();
    }
  }, []);

  return (
    <>
      {console.log(features)}
      <MainPageBanner message={heading} />
      <section className="section main-section"> {/* Full width section */}
        <div className="content">
          {/* Features Section */}
          <FeaturesSection features={features} />

          {/* Render Course Categories */}
          {/* <CourseCards courseCards={courses} /> */}
          <GroupCourses courseCards={courses}/>
          <IndividualCourses courseCards={individualCourses} />

          {/* Info Box */}
          {sampleInfoBox && (
            <SimpleInfoBox
              title={sampleInfoBox.title}
              btnLink={sampleInfoBox.btnLink}
              btnText={sampleInfoBox.btnText}
              backgroundColor={sampleInfoBox.backgroundColor}
            />
          )}
        </div>
      </section>
    </>

  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  description: PropTypes.string,
  courses: PropTypes.arrayOf(PropTypes.object),
  individualCourses: PropTypes.arrayOf(PropTypes.object),
  features: PropTypes.arrayOf(PropTypes.object),
  sampleInfoBox: PropTypes.shape({
    title: PropTypes.string,
    btnLink: PropTypes.string,
    btnText: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        heading={frontmatter.heading}
        description={frontmatter.description}
        courses={frontmatter.courses}
        individualCourses={frontmatter.individualCourses}
        features={frontmatter.features}
        sampleInfoBox={frontmatter.sampleInfoBox}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        description
        courses {
          courseCard {
            title
            body
            headerColor
            btnLink
          }
        }
        individualCourses {
          courseCard {
            title
            headerColor
            btnLink
          }
        }
        features {
          feature {
            text
            svgIcon
          }
        }
        sampleInfoBox {
          title
          btnLink
          btnText
          backgroundColor
        }
      }
    }
  }
`;
