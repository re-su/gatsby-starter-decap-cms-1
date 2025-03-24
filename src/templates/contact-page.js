import * as React from "react";
import { navigate } from "gatsby-link";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

// eslint-disable-next-line
export const ContactPageTemplate = ({ title, desc, content, contentComponent, menutest }) => {
  const [formData, setFormData] = React.useState({}); // State for form inputs

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update state with form values
  };

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

  const PageContent = contentComponent || Content;

  return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1>{title}</h1>
            <p>{desc}</p>
            <PageContent content={content} />
            <ContactForm display={true} handleSubmit={handleSubmit} />
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
