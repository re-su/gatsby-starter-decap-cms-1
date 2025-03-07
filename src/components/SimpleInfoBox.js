import React from "react";
import PropTypes from "prop-types";

const SimpleInfoBox = ({ title, body, btnLink, btnText, backgroundColor }) => {
  return (
    <div className="simple-info-box" style={{ backgroundColor: backgroundColor }}>
      <h2 className="title is-4 has-text-centered">
        {title.split('\\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
        ))}
      </h2>
      { body ? <p className="content has-text-centered">{body}</p> : <></>}
      <div className="has-text-centered">
        <a href={btnLink} className="primary-btn">{btnText}</a>
      </div>
    </div>
  );
};

// Prop Types for the SimpleInfoBox component
SimpleInfoBox.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  btnLink: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default SimpleInfoBox;
