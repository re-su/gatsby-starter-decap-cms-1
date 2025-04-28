import React from "react";

const CourseCard = ({ value = {}, field, forID, classNameWrapper, onChange }) => {
  // Handle the change of input value for individual fields
  const handleInputChange = (event, fieldName) => {
    const updatedValue = { ...value, [fieldName]: event.target.value };
    onChange(updatedValue); // This updates the CMS field
  };

  return (
    <div className={classNameWrapper}>
        <div>
            <label htmlFor={`${forID}-title`}>Title</label>
            <input
            type="text"
            id={`${forID}-title`}
            value={value.title || ''}
            onChange={(event) => handleInputChange(event, 'title')}
            placeholder="Enter title"
            />
        </div>

        <div>
            <label htmlFor={`${forID}-body`}>Body</label>
            <textarea
            id={`${forID}-body`}
            value={value.body || ''}
            onChange={(event) => handleInputChange(event, 'body')}
            placeholder="Enter description"
            />
        </div>
        <label htmlFor={`${forID}-header-color`}>Header color</label>
        <div id={forID} className={classNameWrapper}>
            <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="header-color-input"
            />
        </div>
        <div>
            <label htmlFor={`${forID}-course`}>Price</label>
            <input
            type="number"
            id={`${forID}-course`}
            value={value.price || ''}
            onChange={(event) => handleInputChange(event, 'price')}
            placeholder="Enter price"
            />
        </div>
        <div>
            <label htmlFor={`${forID}-btn-link`}>Button link</label>
            <input
            type="number"
            id={`${forID}-btn-link`}
            value={value.price || ''}
            onChange={(event) => handleInputChange(event, 'btnLink')}
            placeholder="Enter button link"
            />
        </div>
    </div>
  );
};

export default CourseCard;
