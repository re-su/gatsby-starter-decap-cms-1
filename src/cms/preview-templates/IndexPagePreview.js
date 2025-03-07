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
          title={data.title}
          heading={data.heading}
          subheading={data.subheading}
          description={data.description}
          menu={data.menu}
          intro={data.intro || { blurbs: [] }}
          mainpitch={data.mainpitch || {}}
          courseCard={data.courseCard || {}}
          courses={data.courses}
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
