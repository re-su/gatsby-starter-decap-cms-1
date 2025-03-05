import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Girl from "../img/girl2.png";

const FeaturesSection = ({ features }) => {
  return (
    <section className="features-section">
      <div className="features-container">
        {/* Left side: Image */}
        <div className="features-image">
          {/* Static image or Gatsby image for optimization */}
          <img src={Girl} alt="Student learning" />
        </div>

        {/* Right side: Features + CTA */}
        <div className="features-content">
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                {feature.feature.icon !== null && feature.feature.svgIcon === null ? <GatsbyImage
                  image={getImage(feature.feature.icon.childImageSharp.gatsbyImageData)}
                  alt={`Feature icon ${index}`}
                  className="feature-icon"
                /> : <div className="feature-icon"><img src={feature.feature.svgIcon} alt={`Feature icon ${index}`} /></div>}
                <span className="feature-text">{feature.feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="see-more">
            <a href="https://reactjs.org" className="secondary-btn">
              Dowiedz się więcej o szkole językowej <br />
              Twojego dziecka
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

FeaturesSection.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      feature: PropTypes.shape({
        icon: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.object.isRequired,
          }).isRequired,
        }).isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default FeaturesSection;
