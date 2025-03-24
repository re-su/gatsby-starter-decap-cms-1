import React from "react";
import PropTypes from "prop-types";
import personImage from "../img/svg/logo-4.svg";

export default function MainPageBanner(props) {
  return (
    <div className="main-banner">
      <div className="banner-content">
        <div className="banner-left">
          <h1>
            Szkoła językowa <span className="highlight">Fragaria</span>
          </h1>
          <p>Wyzwalamy potencjał <br /> naszych kursantów</p>
          <a href="#group-offers" className="primary-btn offer-btn">Zobacz ofertę</a>
        </div>
        <div className="banner-right">
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
          <img src={personImage} alt="Person" className="person-image" />
        </div>
      </div>
    </div>
  );
}

MainPageBanner.propTypes = {
  message: PropTypes.string
};
