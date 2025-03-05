import React from "react";
import PropTypes from "prop-types";
import CourseCards from "./CourseCards";

const IndividualCourses = ({ courseCards, bgColor }) => {
  return (
    <section className="individual-courses" style={{ backgroundColor: bgColor }}>
      <h2 className="title is-4 has-text-centered">
        Oprócz zajęć grupowych w ofercie <br /> znajdują się również
      </h2>
      <CourseCards courseCards={courseCards} />
    </section>
  );
};

IndividualCourses.propTypes = {
  courseCards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      headerColor: PropTypes.string.isRequired,
      btnLink: PropTypes.string.isRequired,
    })
  ).isRequired,
  bgColor: PropTypes.string,
};

IndividualCourses.defaultProps = {
  bgColor: "#A4E2FF", // Default background color
};

export default IndividualCourses;