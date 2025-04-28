import React from "react";
import PropTypes from "prop-types";
import personImage from "../img/logo-mirrored.svg";
import bgtest from "../img/testbg.png";
import book from "../img/book.svg";
import pencil from "../img/pencil.svg";
import star from "../img/star.svg";
import puzzle from "../img/puzzle.svg";
import fce from "../img/fce.svg";
import education from "../img/education.svg";
import bulb from "../img/bulb.svg";

export default function FullWidthImage(props) {
  const {
    height = 400,
    imgPosition = "top left",
  } = props;

  // Helper function to generate random positions
  const getRandomPosition = (icon) => {
    // Define the positions
    const positions = [
      { top: "15%", left: "10%" }, // Top-left
      { top: "15%", left: "80%" }, // Top-right
      { top: "75%", left: "15%" }, // Bottom-left
      { top: "75%", left: "75%" }, // Bottom-right
      { top: "40%", left: "10%" }, // Mid-left
      { top: "80%", left: "90%" }, // Mid-right
      { top: "25%", left: "50%" }, // Near center-top
      { top: "65%", left: "50%" }, // Near center-bottom
    ];

    return positions[icon];
  };



  return (
    <React.Fragment>
      <div
        className="margin-top-0"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "70vh",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr auto",
          alignItems: "center",
          justifyItems: "center",
          background: "linear-gradient(90deg, rgba(255,156,246,1) 0%, rgba(115,224,255,1) 100%)",
        }}
      >
        {/* Floating Elements */}
        {[book, pencil, star, puzzle, education, fce, bulb].map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`Floating icon ${index}`}
            style={{
              position: "absolute",
              ...getRandomPosition(index),
              width: "70px", // Set a uniform size
              animation: `float ${Math.random() * 5 + 3}s ease-in-out infinite`, // Randomize float duration
              zIndex: 1,
            }}
          />
        ))}

        {/* Content */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "1em",
            marginTop: "2em",
          }}
        >
          {/* Person Image */}
          <img
            src={personImage}
            alt="Person"
            style={{
              maxHeight: "60vh",
              width: "auto",
              marginBottom: "1rem",
            }}
          />

          {/* Text Bubble */}
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "20px",
              padding: "1.5rem 2rem",
              color: "black",
              fontSize: "1.2rem",
              boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
              maxWidth: "500px",
              marginBottom: "1.5rem",
              position: "relative",
            }}
          >
            {Array.from("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.").map((char, index) => (
              <span
                key={index}
                style={{
                  opacity: 0,
                  display: "inline-block",
                  animation: `fadeInFromLeft 0.2s ease-out ${index * 0.05}s forwards`, // Staggered animation
                }}
              >
                {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for spaces */}
              </span>
            ))}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-17px",
                transform: "translateY(-50%)",
                width: "0",
                height: "0",
                borderTop: "17px solid transparent",
                borderBottom: "17px solid transparent",
                borderRight: "17px solid black",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "-14px",
                transform: "translateY(-50%)",
                width: "0",
                height: "0",
                borderTop: "15px solid transparent",
                borderBottom: "15px solid transparent",
                borderRight: "15px solid white",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* CSS Animation for Floating */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes orbit {
            0% {
              transform: rotate(0deg) translateX(100px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translateX(100px) rotate(-360deg);
            }
          }

          @keyframes pulsate {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
            @keyframes fadeInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
        `}
      </style>
    </React.Fragment>
  );
}

FullWidthImage.propTypes = {
  height: PropTypes.number,
  img: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  subheading: PropTypes.string,
};
