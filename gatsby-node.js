const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const pages = result.data.allMarkdownRemark.edges

    pages.forEach((edge) => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        templateKey: edge.node.frontmatter.templateKey,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Save slugs for use in sitemap generation
    exports.allSlugs = pages.map(edge => edge.node.fields.slug)
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onPostBuild = async ({ graphql }) => {
  const siteUrl = 'https://www.fragariaschool.pl'

  const sitemapEntries = exports.allSlugs.map(
    slug => `<url><loc>${siteUrl}${slug}</loc></url>`
  ).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`

  const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`

  // Write the files to the public directory
  fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemap)
  fs.writeFileSync(path.join('public', 'robots.txt'), robots)

  console.log('✅ Generated sitemap.xml and robots.txt')
}
