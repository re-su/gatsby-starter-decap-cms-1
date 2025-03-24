import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <>
        <IndexPageTemplate
          image={getAsset(data.image)}
          heading={data.heading}
          description={data.description}
          courses={data.courses}
          individualCourses={data.individualCourses}
          features={data.features}
          sampleInfoBox={data.sampleInfoBox}
        />
        <p>Index page preview</p>
      </>
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
