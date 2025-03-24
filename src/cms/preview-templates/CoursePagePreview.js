import React from 'react'
import PropTypes from 'prop-types'
import { CoursePageTemplate } from '../../templates/course'
import { HTMLContent } from "../../components/Content";
import { Helmet } from "react-helmet";

const CoursePagePreview = ({ entry, widgetFor }) => {
    return (
      <CoursePageTemplate
        // contentComponent={HTMLContent}
        content={widgetFor('body')}
        title={entry.getIn(['data', 'title']) || ''}
        date={entry.getIn(['data', 'date']) || ''}
        cardheading={entry.getIn(['data', 'cardheading']) || ''}
        cardlist={entry.getIn(['data', 'cardlist'])?.toJS() || []}
        helmet={
          <Helmet titleTemplate="%s | Course">
            <title>{entry.getIn(['data', 'title']) || 'Course'}</title>
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
