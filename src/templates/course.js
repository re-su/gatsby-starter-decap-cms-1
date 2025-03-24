import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby-link";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";

export const CoursePageTemplate = ({
  id,
  content,
  contentComponent,
  title,
  date,
  cardheading,
  cardlist,
  cardcolor,
  color,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = React.useState({}); // State for form inputs

  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...formData,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  return (
    <section className="course-page">
      {helmet || ""}
      <div className="course-container">
        <h1 className="course-title">{title}</h1>
        <PostContent content={content} className="course-body" />

        {/* Info Card */}
        <div id="course-info-card" style={{ backgroundColor: cardcolor }}>
          <h2 className="course-info-card-title">{cardheading}</h2>
          <ul className="course-info-card-list">
            {cardlist &&
              cardlist.map((item, index) => (
                <li key={index} className="course-info-card-list-item">
                  {item}
                </li>
              ))}
          </ul>
        </div>

        {/* Button to show form */}
        <div className="course-card-container">
          <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
            Zapisz się
          </button>
        </div>

        {/* Contact Form (Visible when button is clicked) */}
        <ContactForm display={showForm} id={id} handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

CoursePageTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  date: PropTypes.string,
  cardheading: PropTypes.string,
  cardlist: PropTypes.arrayOf(PropTypes.string),
  cardcolor: PropTypes.string,
  color: PropTypes.string,
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
        date={course.frontmatter.date}
        cardheading={course.frontmatter.cardheading}
        cardlist={course.frontmatter.cardlist}
        color={course.frontmatter.color}
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
        cardlist
        cardcolor
        color
      }
    }
  }
`;
