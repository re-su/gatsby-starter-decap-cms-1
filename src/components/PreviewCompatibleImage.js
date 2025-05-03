import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo, lazyLoad }) => {
  const imageStyle = { borderRadius: "5px" };
  const { alt = "", image } = imageInfo;

  const gatsbyImage =
    image?.childImageSharp?.gatsbyImageData || imageInfo?.childImageSharp?.gatsbyImageData;

  if (gatsbyImage) {
    return (
      <GatsbyImage
        image={gatsbyImage}
        style={imageStyle}
        alt={alt}
        loading={lazyLoad ? "lazy" : "eager"}
      />
    );
  }

  if (image?.publicURL) {
    return (
      <img
        style={imageStyle}
        src={image.publicURL}
        alt={alt}
        loading={lazyLoad ? "lazy" : "eager"}
      />
    );
  }

  if (typeof image === "string") {
    return (
      <img
        style={imageStyle}
        src={image}
        alt={alt}
        loading={lazyLoad ? "lazy" : "eager"}
      />
    );
  }

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
