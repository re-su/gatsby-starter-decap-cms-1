import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import personImage from "../img/svg/logo-4.svg";
import { Link } from "gatsby";
import { useInView } from "../hooks/useInView";

export default function MainPageBanner(props) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    const detectTranslation = () => {
      const hasFontTag = document.querySelector("font"); // Google Translate often injects <font> tags
      const htmlLang = document.documentElement.lang;
      const isLangChanged = htmlLang && htmlLang !== "pl"; // Replace with your original lang if different
      setIsTranslated(hasFontTag || isLangChanged);
    };

    // Run on initial render
    detectTranslation();

    // Optional: Re-check later (in case translation loads after page mount)
    const interval = setInterval(detectTranslation, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-banner">
      <div className="banner-background"></div>
      <div className="banner-content">
        <div ref={ref} className={`banner-left fade-in-section ${inView ? "is-visible" : ""}`}>
          <h1>
            Szkoła językowa <span className="highlight">Fragaria</span>
          </h1>
          <p>
            Wyzwalamy potencjał <br /> naszych kursantów
          </p>
          <Link className="primary-btn offer-btn" to="/kursy">
            Zobacz ofertę
          </Link>
        </div>
        <div ref={ref} className={`banner-right fade-in-section ${inView ? "is-visible" : ""}`}>
          <div
            className="text-bubble pbottom acenter"
            aria-label={props.message}
            data-text={props.message}
          >
            {isTranslated ? (
              // Plain message for translated mode
              <div className="plain-message">{props.message}</div>
            ) : (
              // Animated version
              props.message.split(" ").map((word, wordIndex, wordsArray) => (
                <span key={wordIndex} className="text-word">
                  {Array.from(word).map((char, charIndex) => {
                    const globalCharIndex =
                      wordsArray.slice(0, wordIndex).join("").length + charIndex;
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
                  &nbsp;
                </span>
              ))
            )}

            <div className="bubble-tail dark"></div>
            <div className="bubble-tail light"></div>
          </div>
          <img
            src={personImage}
            alt="Person"
            loading="eager"
            className="person-image"
          />
        </div>
      </div>
    </div>
  );
}

MainPageBanner.propTypes = {
  message: PropTypes.string,
};