import React, { useEffect, useState } from "react";
import banner from "../img/MainPageBanner.webp";
import { Link } from "gatsby";
import { useInView } from "../hooks/useInView";

export default function MainPageBanner() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    const detectTranslation = () => {
      const hasFontTag = document.querySelector("font");
      const htmlLang = document.documentElement.lang;
      const isLangChanged = htmlLang && htmlLang !== "pl";
      setIsTranslated(hasFontTag || isLangChanged);
    };

    detectTranslation();
    const interval = setInterval(detectTranslation, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-banner">
      <div ref={ref} className={`banner-background fade-in-from-left-section ${inView ? "is-visible" : ""}`}></div>
      <div className="banner-content">
        <div
          ref={ref}
          className={`banner-left fade-in-from-left-section ${inView ? "is-visible" : ""}`}
        >
          <h1>
            Szkoła językowa <span className="highlight">Fragaria</span>
          </h1>
          <p>Wyzwalamy potencjał <br /> naszych kursantów</p>
          <Link className="primary-btn offer-btn" to="/kursy">
            Zobacz ofertę
          </Link>
        </div>

        <div
          ref={ref}
          className={`banner-right fade-in-from-right-section ${inView ? "is-visible" : ""}`}
        >
          <img
            src={banner}
            alt="Person"
            loading="eager"
            className="person-image"
          />
        </div>
      </div>
    </div>
  );
}
