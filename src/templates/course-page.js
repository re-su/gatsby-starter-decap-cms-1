import React, { useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import priceIcon from "../img/icons/dolar.svg"

export const CoursePageTemplate = ({
  id,
  content,
  contentComponent,
  title,
  cardheading,
  cardlist,
  cardcolor,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="course-page">
      {helmet || ""}
      <div className="course-container">
        <h1 className="course-title">{title}</h1>
        <PostContent content={content} className="course-body" />

        {/* Info Cards */}
        <div className="course-info-cards-container">
          <div key={0} className="course-info-card" style={{ backgroundColor: cardcolor }}>
            
            <img src={priceIcon} />
            
            <p className="course-info-card-text">{cardheading}</p>
          </div>
          {cardlist &&
            cardlist.map((item, index) => (
              <div key={index} className="course-info-card" style={{ backgroundColor: cardcolor }}>
                {item.image && (
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: item.image,
                      alt: `Image`,
                    }}
                  />
                )}
                <p className="course-info-card-text">{item.item}</p>
              </div>
            ))}
        </div>


        {/* Button to show form */}
        <div className="course-card-button-container">
          <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
            Zapisz się
          </button>
        </div>

        {/* Contact Form (Visible when button is clicked) */}
        <ContactForm display={showForm} id={id} courses={[{ id: id, title: title }]} />
      </div>
    </section>
  );
};

CoursePageTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  cardheading: PropTypes.string,
  cardlist: PropTypes.arrayOf(PropTypes.string),
  cardcolor: PropTypes.string,
  helmet: PropTypes.object,
};

const CoursePage = ({ data }) => {
  const { markdownRemark: course } = data;

  return (
    <Layout>
      <CoursePageTemplate
        id={course.id}
        content={course.html}
        contentComponent={HTMLContent}
        title={course.frontmatter.title}
        cardheading={course.frontmatter.cardheading}
        cardlist={course.frontmatter.cardlist}
        cardcolor={course.frontmatter.cardcolor}
        helmet={
          <Helmet titleTemplate="%s | Fragaria">
            <title>{`${course.frontmatter.title}`}</title>
            <meta name="description" content={course.frontmatter.description} />
            <style>{`body { background-color: ${course.frontmatter.color}; }`}</style>
          </Helmet>
        }
      />
    </Layout>
  );
};

CoursePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CoursePage;

export const pageQuery = graphql`
  query CoursePageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        cardheading
        cardlist {
          item
          image {
            publicURL
            childImageSharp {
              gatsbyImageData(width: 300, quality: 100, layout: CONSTRAINED)
            }
          }
        }
        cardcolor
        color
      }
    }
  }
`;
