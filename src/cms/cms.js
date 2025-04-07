import CMS from 'decap-cms-app'
import uploadcare from 'decap-cms-media-library-uploadcare'
import cloudinary from 'decap-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import CoursePagePreview from './preview-templates/CoursePagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'

import MenuWidget from './widgets/MenuWidget'
import CourseCard from './widgets/CourseCard'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('courses', CoursePagePreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
console.log("cms invoked");
CMS.registerWidget("menutest", MenuWidget)
CMS.registerWidget("priceCard", CourseCard)
