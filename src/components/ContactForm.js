import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

const ContactForm = ({ display, courses, id, isFullscreen }) => {
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    course: "", // Initialize course as empty
  });

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, "");

    // Format as XXX-XXX-XXX
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}`;
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const encode = (data) => {
    const encoded = Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] || ""))
      .join("&");
    // console.log("Encoded Form Data: ", encoded); // Log the data to see if it's correct
    return encoded;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Build FormData from the form DOM itself
    const formDataDom = new FormData(form);

    // Convert it into URL encoded string
    const encodedData = new URLSearchParams(formDataDom).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedData,
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };


  // Handle form data changes
  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  // If id is provided, set the selected option to the specific course
  useEffect(() => {
    if (id && courses) {
      const selectedCourse = courses.find((course) => course.id === id);
      if (selectedCourse && selectedCourse.title !== formData.course) {
        setFormData((prevData) => ({
          ...prevData,
          course: selectedCourse.title, // Set the course from `id`
        }));
      }
    } else if (courses.length > 0 && formData.course === "") {
      // Set the first course as default if no `id` is provided and course is not already set
      setFormData((prevData) => ({
        ...prevData,
        course: courses[0].title, // Set to the title of the first course
      }));
    }
  }, [id, courses, formData.course]); // Add `formData.course` as a dependency to prevent unnecessary updates

  return (
    <div className={`contact-form-container ${display ? "open" : ""} ${isFullscreen ? "isFullscreen" : ""}`}>
      <div className="contact-form">
        <h3>Zapisz się na kurs</h3>
        <form
          name="course-signup"
          method="post"
          action="/zapisy/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="course-signup" />
          <p hidden>
            <label>
              Don’t fill this out if you’re human: <input name="bot-field" />
            </label>
          </p>

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
            {id && id !== null ? (
              <>
                <div className="contact-form-course-name">{courses.find((course) => course.id === id)?.title}</div>
                <input type="hidden" name="course" value={courses.find((course) => course.id === id)?.title} />
              </>
            ) : (
              <select name="course" id="course" value={formData.course} onChange={handleChange} required>
                {courses.map((course) => (
                  <option key={course.id} value={course.title}>
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
