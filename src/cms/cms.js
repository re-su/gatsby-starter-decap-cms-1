import CMS from 'decap-cms-app'
import uploadcare from 'decap-cms-media-library-uploadcare'
import cloudinary from 'decap-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import CoursePagePreview from './preview-templates/CoursePagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'

// import MenuWidget from './widgets/MenuWidget'
// import CourseCard from './widgets/CourseCard'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('o-nas', AboutPagePreview)
CMS.registerPreviewTemplate('kursy', CoursePagePreview)
CMS.registerPreviewTemplate('kontakt', ContactPagePreview)
