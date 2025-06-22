import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

const ContactForm = ({ display, courses, id, isFullscreen }) => {
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    course: "",
    age: "", // ✅ Dodane pole wieku
    consent: false,
  });

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}`;
  };

  const handlePhoneChange = (e) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key] || ""))
      .join("&");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Musisz wyrazić zgodę na przetwarzanie danych osobowych.");
      return;
    }

    const form = e.target;
    const formDataDom = new FormData(form);
    const encodedData = new URLSearchParams(formDataDom).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedData,
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch((error) => alert(error));
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleConsentChange = (e) => {
    setFormData((prevData) => ({ ...prevData, consent: e.target.checked }));
  };

  useEffect(() => {
    if (id && courses) {
      const selectedCourse = courses.find((course) => course.id === id);
      if (selectedCourse && selectedCourse.title !== formData.course) {
        setFormData((prevData) => ({
          ...prevData,
          course: selectedCourse.title,
        }));
      }
    } else if (courses.length > 0 && formData.course === "") {
      setFormData((prevData) => ({
        ...prevData,
        course: courses[0].title,
      }));
    }
  }, [id, courses, formData.course]);

  return (
    <div className={`contact-form-container ${display ? "open" : ""} ${isFullscreen ? "isFullscreen" : ""}`}>
      <div className="contact-form">
        <h5 className="contact-form-container-info">
          Zajęcia startują we wrześniu 2025
        </h5>
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

          {/* 🔹 Sekcja: Dane kursanta */}
          <div className="form-section">
            <h4>Dane kursanta</h4>

            <label>
              Imię i nazwisko:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
              Wiek:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
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
                <select
                  name="course"
                  id="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  {courses
                    // .filter((course) => !course.isBlocked)      // ⬅️ skip blocked ones
                    .map((course) => (
                      <option key={course.id} value={course.title} disabled={course.isBlocked}>
                        {course.title} {course.isBlocked ? "(Aktualnie brak wolnych miejsc)" : ""}
                      </option>
                    ))}
                </select>

              )}
            </label>
          </div>
          <div className="form-section">
            {/* 🔹 Sekcja: Dane kontaktowe */}
            <h4>Dane kontaktowe</h4>

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
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleConsentChange}
                required
              />
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celach rekrutacyjnych.
            </label>

            <button
              type="submit"
              className={`primary-btn ${!formData.consent ? 'disabled' : ''}`}
              disabled={!formData.consent}
            >
              Wyślij
            </button>
          </div>
        </form>

      </div >
    </div >
  );
};

export default ContactForm;
