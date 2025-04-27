import React from "react";
import PropTypes from "prop-types";
import CourseCards from "./CourseCards";
import { useInView } from "../hooks/useInView";

const IndividualCourses = ({ courseCards, bgColor }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <section ref={ref} className={`individual-courses fade-in-section ${inView ? "is-visible" : ""}`} style={{ backgroundColor: bgColor }}>
      <h2 className="title is-4 has-text-centered">
        Oprócz zajęć grupowych w ofercie <br /> znajdują się również
      </h2>
      <CourseCards courseCards={courseCards} cardsClasses={"is-6"}/>
    </section>
  );
};

IndividualCourses.propTypes = {
  courseCards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
      headerColor: PropTypes.string.isRequired,
      btnLink: PropTypes.string.isRequired,
      selectedCourse: PropTypes.string.isRequired
    })
  ).isRequired,
  bgColor: PropTypes.string,
};

IndividualCourses.defaultProps = {
  bgColor: "#A4E2FF", // Default background color
};

export default IndividualCourses;