import React from "react";
import PropTypes from "prop-types";
import CourseCard from "./CourseCard";

const CourseCards = ({ courseCards, cardsClasses }) => {
  return (
    <div className="cards columns is-multiline">
      {courseCards && courseCards.length > 0 ? (
        courseCards.map((courseCard, index) => (
          <div key={index} className={`${cardsClasses} column`}>
            <CourseCard
              title={courseCard.title}
              body={courseCard.body}
              price={courseCard.price}
              headerColor={courseCard.headerColor}
              btnLink={courseCard.btnLink}
              selectedCourse={courseCard.selectedCourse}
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
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      price: PropTypes.number, // Made price optional (remove `.isRequired` if it's missing in some courses)
      headerColor: PropTypes.string.isRequired,
      btnLink: PropTypes.string.isRequired,
      selectedCourse: PropTypes.string
    })
  ).isRequired,
};

export default CourseCards;
