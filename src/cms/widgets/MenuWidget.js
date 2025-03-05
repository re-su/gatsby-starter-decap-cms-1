import React from "react";

const MenuWidget = ({ value = 'def', field, forID, classNameWrapper }) => {
    console.log("MenuWidget ivoked");
    return (
      <div className={classNameWrapper}>
        <p id={forID}>
          {field.get('label')}: {value + "ewqe" || 'No value provided'}
        </p>
      </div>
    );
  };

export default MenuWidget;
