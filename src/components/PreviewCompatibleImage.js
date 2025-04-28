import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo, lazyLoad }) => {
  const imageStyle = { borderRadius: "5px" };

  const { alt = "", childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        style={imageStyle}
        alt={alt}
        loading={lazyLoad ? "lazy" : "eager"}
      />
    );
  } else if (!!childImageSharp) {
    return (
      <GatsbyImage
        image={childImageSharp.gatsbyImageData}
        style={imageStyle}
        alt={alt}
      />
    );
    // for Netlify CMS 
  } else if (image && image.publicURL) {
    return <img style={{imageStyle}} src={image.publicURL} alt={alt} loading={lazyLoad ? "lazy" : "eager"} />;
  } else if(image) {
    return <img style={{imageStyle}} src={image} alt={alt} loading={lazyLoad ? "lazy" : "eager"} />;
  } else {
    return null;
  }
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
