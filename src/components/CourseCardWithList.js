import React from "react";
import PropTypes from "prop-types";

const CourseCardWithList = ({ headerText, bodyText, details, btnText, btnLink, headerColor }) => {
  return (
    <div className="course-card-with-list">
      <div className="course-card-with-list-title" style={{ backgroundColor: headerColor || undefined }}>
        {headerText}
      </div>
      <div className="course-card-with-list-price">{bodyText}</div>
      <ul className="course-card-with-list-details">
        {details.map((detail, index) => (
          <li key={index} className="course-card-with-list-detail">
            <span className="course-card-with-list-detail-icon">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#35a8de">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
              </svg>
            </span>
            {detail}
          </li>
        ))}
      </ul>
      <a href={btnLink} className="primary-btn">{btnText}</a>
    </div>
  );
};

// Prop Types for the CourseCardWithList component
CourseCardWithList.propTypes = {
  headerText: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  btnText: PropTypes.string.isRequired,
  headerColor: PropTypes.string.isRequired,
};

export default CourseCardWithList;
