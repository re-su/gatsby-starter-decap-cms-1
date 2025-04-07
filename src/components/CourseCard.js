import React from "react";
import PropTypes from "prop-types";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

const CourseCard = ({ title, body, price, btnLink, headerColor, selectedCourse }) => {
  return (
    <div className="course-card">
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
      <a href={selectedCourse ? "/courses/" + selectedCourse : btnLink} className="secondary-btn">SZCZEGÓŁY KURSU</a>
    </div>
  );
};

// Prop Types for the CourseCard component
CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  btnLink: PropTypes.string.isRequired,
  headerColor: PropTypes.string.isRequired,
  selectedCourse: PropTypes.string
};

export default CourseCard;
