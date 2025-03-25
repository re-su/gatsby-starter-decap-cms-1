import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";

const ContactForm = ({ display, id, isFullscreen }) => {
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    course: "",
  });

  // Fetch courses
  const data = useStaticQuery(graphql`
    query CourseListQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "course" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const courses = data.allMarkdownRemark.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.frontmatter.title,
  }));

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}`;
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
    setFormData({ ...formData, number: formatPhoneNumber(e.target.value) });
  };

  useEffect(() => {
    if (id) {
      const selectedCourse = courses.find((course) => course.id === id);
      if (selectedCourse) {
        setFormData({ ...formData, course: selectedCourse.title });
      }
    }
  }, [id, courses]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
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

  return (
    <div className={`contact-form-container ${display ? "open" : ""} ${isFullscreen ? "isFullscreen" : ""}`}>
      <div className="contact-form">
        <h3>Zapisz się na kurs</h3>
        <form
          name="course-signup"
          method="post"
          action="/contact/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="course-signup" />

          <label>
            Imię i nazwisko:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Numer telefonu:
            <input
              type="tel"
              name="number"
              value={phone}
              placeholder="123-456-789"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
              onChange={handlePhoneChange}
              required
            />
          </label>

          <label>
            Kurs:
            <select name="course" value={formData.course} onChange={handleChange} required>
              {courses.map((course) => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="primary-btn">
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
