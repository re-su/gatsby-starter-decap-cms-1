import React from 'react'
import PropTypes from 'prop-types'
import { CoursePageTemplate } from '../../templates/course-page'
import { Helmet } from "react-helmet";

const CoursePagePreview = ({ entry, widgetFor }) => {
    return (
      <CoursePageTemplate
        content={widgetFor('body')}
        title={entry.getIn(['data', 'title']) || ''}
        cardcolor={entry.getIn(['data', 'cardcolor']) || ''}
        cardheading={entry.getIn(['data', 'cardheading']) || ''}
        cardlist={entry.getIn(['data', 'cardlist'])?.toJS() || []}
        helmet={
          <Helmet titleTemplate="%s | Fragaria">
            <title>Kurs</title>
            <style>{`html { background-color: red; }; }`}</style>
          </Helmet>
        }
      />
    );
  };
  
  

CoursePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CoursePagePreview
