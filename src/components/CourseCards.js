import React from "react";
import PropTypes from "prop-types";
import CourseCard from "./CourseCard";

const CourseCards = ({ courseCards }) => {
  return (
    <div className="cards columns is-multiline">
      {courseCards && courseCards.length > 0 ? (
        courseCards.map((courseCard, index) => (
          <div key={index} className="column is-6">
            <CourseCard
              title={courseCard.courseCard.title}
              body={courseCard.courseCard.body}
              price={courseCard.courseCard.price}
              headerColor={courseCard.courseCard.headerColor}
              btnLink={courseCard.courseCard.btnLink}
            />
          </div>
        ))
      ) : (
        <p>Courses are not available</p>
      )}
    </div>
  );
};

CourseCards.propTypes = {
  courseCards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired, // courseCard.title must be a string
      body: PropTypes.string.isRequired,  // courseCard.body must be a string
      price: PropTypes.number.isRequired, // courseCard.price must be a number
      headerColor: PropTypes.string.isRequired, // courseCard.headerColor must be a string
      btnLink: PropTypes.string.isRequired, // courseCard.btnLink must be a string
    })
  ).isRequired,
};

export default CourseCards;
