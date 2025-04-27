import React from "react";
import PropTypes from "prop-types";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { useInView } from "../hooks/useInView";

const CourseCard = ({ title, body, price, btnLink, headerColor, selectedCourse }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`course-card fade-in-section ${inView ? "is-visible" : ""}`}
    >
      <h2 className="course-card-title" style={{ '--course-card-title-bg-color': headerColor }}>
        <p className="course-card-title-text">{title}</p>
        <p className="course-card-title-dots"> <MoreHoriz fontSize="large" aria-label="More options" /></p>
      </h2>
      <p className="course-card-body">{body}</p>
      {price && price > 0 ? 
      <div className="course-card-course">
        <span className="course-card-course-label">Cena: </span>
        <span className="course-card-course-value">{price} zł</span>
      </div> : <></>
      }
      <a href={"/kursy/" + selectedCourse} className="secondary-btn">SZCZEGÓŁY KURSU</a>
    </div>
  );
};

// Prop Types for the CourseCard component
CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  price: PropTypes.number,
  btnLink: PropTypes.string.isRequired,
  headerColor: PropTypes.string.isRequired,
  selectedCourse: PropTypes.string
};

export default CourseCard;
