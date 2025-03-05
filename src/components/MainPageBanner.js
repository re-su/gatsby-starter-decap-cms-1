import React from "react";
import PropTypes from "prop-types";

import personImage from "../img/svg/logo-4.svg";
import book from "../img/book.svg";
import pencil from "../img/pencil.svg";
import star from "../img/star.svg";
import puzzle from "../img/puzzle.svg";
import fce from "../img/fce.svg";
import education from "../img/education.svg";
import bulb from "../img/bulb.svg";
import { useMediaQuery } from "react-responsive"; // ✅ Import useMediaQuery

export default function MainPageBanner(props) {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // ✅ Detect mobile screens

  const positions = isMobile
  ? [
      { top: "10%", left: "10%" },
      { top: "85%", left: "15%" },
      { top: "75%", left: "75%" },
    ]
  : [
      { top: "15%", left: "10%" },
      { top: "15%", left: "80%" },
      { top: "75%", left: "15%" },
      { top: "75%", left: "75%" },
      { top: "40%", left: "10%" },
      { top: "80%", left: "90%" },
    ];

  return (
    <div className="main-banner">
      {/* Floating Elements */}
      {[book, pencil, star, puzzle, bulb].slice(0, isMobile ? 3 : 5).map((icon, index) => (
        <img
          key={index}
          src={icon}
          alt={`Floating icon ${index}`}
          className="floating-icon"
          style={{
            ...positions[index],
            animation: `float ${Math.random() * (isMobile ? 3 : 5) + 2}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Content */}
      <div className="banner-content">
        <img src={personImage} alt="Person" className="person-image" />
        {/* <personImage /> */}

        {/* Text Bubble */}
        <div className="text-bubble pbottom acenter">
          {props.message.split(' ').map((word, wordIndex, wordsArray) => {
            return (
              <span key={wordIndex} className="text-word">
                {Array.from(word).map((char, charIndex) => {
                  const globalCharIndex = wordsArray.slice(0, wordIndex).join('').length + charIndex;
                  return (
                    <span
                      key={charIndex}
                      className="text-char"
                      style={{ animationDelay: `${globalCharIndex * 0.05}s` }}
                    >
                      {char}
                    </span>
                  );
                })}
                &nbsp; {/* Ensure spaces are maintained */}
              </span>
            );
          })}
          <div className="bubble-tail dark"></div>
          <div className="bubble-tail light"></div>
        </div>


      </div>
    </div>
  );
}

MainPageBanner.propTypes = {
  message: PropTypes.string
};
