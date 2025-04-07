import React from "react";
import PropTypes from "prop-types";
import strawberry from "../img/strawberry-pointing-down.svg";
import { Link } from 'gatsby'

const SimpleInfoBox = ({ title, body, btnLink, btnText, backgroundColor }) => {
  return (
    <div className="simple-info-box" style={{ backgroundColor: backgroundColor }}>
      <img src={strawberry} alt="Person" className="pointing-strawberry"/>
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
        <Link to={btnLink} className="primary-btn">{btnText}</Link>
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
