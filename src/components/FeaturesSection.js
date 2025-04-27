import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { useInView } from "../hooks/useInView";
import { Link } from 'gatsby'

const FeaturesSection = ({ features }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  return (
    <section ref={ref} className={`features-section fade-in-section ${inView ? "is-visible" : ""}`}>
      <div className="features-container">
        {/* Left side: Image */}
        <div className="features-image">
          <StaticImage
            src="../img/girl2.png"
            alt="Student learning"
            placeholder="blurred"
            layout="constrained"
            width={1000}
            quality={100}
            formats={["auto", "webp"]}
          />
          {/* <img src={Girl}/> */}
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
            <Link to="/o-nas" className="secondary-btn">
              Dowiedz się więcej o <br />
              naszej szkole językowej
            </Link>
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
