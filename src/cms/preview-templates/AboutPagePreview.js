import React from 'react';
import { AboutPageTemplate } from '../../templates/about-page';

const AboutPagePreview = ({ entry, widgetFor, getAsset }) => {
  const teachers = entry.getIn(['data', 'teachers']).toJS() || [];
  
  // Fetch the teacher images using getAsset for the preview
  const teachersWithImages = teachers.map((teacher) => ({
    ...teacher,
    photo: getAsset(teacher.photo), // Use getAsset to fetch the image URL
  }));

  return (
    <div>
      <AboutPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
        teachers={teachersWithImages} // Pass the teachers with fetched image URLs
      />
    </div>
  );
};

export default AboutPagePreview;
