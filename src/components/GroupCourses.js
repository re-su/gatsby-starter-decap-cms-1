import React from "react";
import PropTypes from "prop-types";
import CourseCards from "./CourseCards";
import StrawberryRight from "../img/strawberry-pointing-right.svg";
import StrawberryUp from "../img/strawberry-pointing-up.svg";
import ArrowDown from "../img/arrow-down.svg"; // ✅ Import arrow image
import { useMediaQuery } from "react-responsive"; // ✅ Import useMediaQuery

const GroupCourses = ({ courseCards }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // ✅ Detect mobile screens

  return (
    <div className="section" style={{ padding: "85px 1.5rem" }}>
      <div className="container">
        <div className={`columns is-vcentered ${isMobile ? "is-flex is-flex-direction-column" : ""}`}>

          {/* Title + Arrow (Mobile: Arrow on Right) */}
          <div className="column is-4 has-text-centered">
            <div className="is-flex is-align-items-center is-justify-content-center" style={{ height: "100%", flexDirection: "row", alignItems: "center" }}>
              <h2 className="title is-3 has-text-weight-bold has-text-centered">
                Poznaj moją ofertę
              </h2>

              {/* Arrow (Only on Mobile) */}
              {isMobile && (
                <img
                  src={ArrowDown}
                  alt="Arrow Right"
                  style={{ width: "40px", height: "auto", marginLeft: "10px" }}
                />
              )}
            </div>



            {/* ✅ Show Strawberry on Desktop */}
            {!isMobile && <img src={StrawberryRight} alt="Strawberry Mascot" className="image is-256x256" />}
          </div>

          {/* Course Cards */}
          <div className="column" style={{width: isMobile ? "100vw": "100%"}}>
            <CourseCards courseCards={courseCards} />
          </div>

          {/* Mobile: Show Strawberry Below Cards */}
          {isMobile && (
            <div className="has-text-centered mt-5">
              <img src={StrawberryUp} alt="Strawberry Mascot" className="image strawberry-up" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

GroupCourses.propTypes = {
  courseCards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      headerColor: PropTypes.string.isRequired,
      btnLink: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GroupCourses;
