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
          <img src={Girl} alt="Student learning" />
        </div>

        {/* Right side: Features + CTA */}
        <div className="features-content">
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                {/* Handle Gatsby Image or Fallback to SVG */}
                {feature.icon && feature.icon.childImageSharp ? (
                  <GatsbyImage
                    image={getImage(feature.icon.childImageSharp.gatsbyImageData)}
                    alt={`Feature icon ${index}`}
                    className="feature-icon"
                  />
                ) : (
                  feature.svgIcon && (
                    <div className="feature-icon">
                      <img src={feature.svgIcon} alt={`Feature icon ${index}`} />
                    </div>
                  )
                )}
                <span className="feature-text">{feature.text}</span>
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
      icon: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          gatsbyImageData: PropTypes.object,
        }),
      }),
      svgIcon: PropTypes.string,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeaturesSection;
