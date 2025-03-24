import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

const ContactForm = ({ display, id, handleSubmit }) => {
    const [phone, setPhone] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    // GraphQL query to fetch courses
    const data = useStaticQuery(graphql`
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
      `);

    // Extracting the courses data
    const courses = data.allMarkdownRemark.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.frontmatter.title,
    }));

    const formatPhoneNumber = (value) => {
        // Remove all non-numeric characters
        const cleaned = value.replace(/\D/g, "");

        // Format as XXX-XXX-XXX
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}`;
    };

    const handlePhoneChange = (e) => {
        console.log(e.target.value)
        setPhone(formatPhoneNumber(e.target.value));
    };

    // If id is provided, set the selected option to the specific course
    useEffect(() => {
        if (id) {
            const selectedCourse = courses.find((course) => course.id === id);
            console.log(selectedCourse)
            if (selectedCourse) {
                setSelectedOption(selectedCourse.title);
            }
        }
    }, [id, courses]);

    return (
        <div className={`contact-form-container ${display ? "open" : ""}`}>
            <div className="contact-form">
                <h3>Zapisz się na kurs</h3>
                <form 
                    name="course-form"
                    method="post"
                    action="/contact/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit} // Updated to use local `handleSubmit`
                >
                    <input type="hidden" name="form-name" value="course-signup" />

                    <label>
                        Imię i nazwisko:
                        <input type="text" name="name" required />
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" required />
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
                        Wybierz kurs:
                        {/* If id is provided, show the course name directly */}
                        {id ? (
                            <div className="course-form-name">{selectedOption}</div>
                        ) : (
                            // If no id, show all courses as clickable options
                            <select>
                                {courses.map((course, index) => (
                                    <option
                                        type="button"
                                        key={index}
                                        onClick={() => setSelectedOption(course.title)}
                                        className="course-option-btn"
                                    >
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        )}
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
