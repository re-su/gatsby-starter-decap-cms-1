const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach((e) => console.error(e.toString()))
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges

  // Create pages for each Markdown file
  posts.forEach((edge) => {
    const id = edge.node.id
    const slug = edge.node.fields.slug
    const templateKey = edge.node.frontmatter.templateKey || 'default-template'

    console.log(`Creating page: ${slug} with template: ${templateKey}`)

    createPage({
      path: slug,
      component: path.resolve(`src/templates/${templateKey}.js`),
      context: {
        id,
      },
    })
  })

  // Create tag pages
  let tags = []
  posts.forEach((edge) => {
    if (_.get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })
  tags = _.uniq(tags)

  tags.forEach((tag) => {
    const tagPath = `/tags/${_.kebabCase(tag)}/`
    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tags.js`),
      context: {
        tag,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    // Generate slug based on file path
    const value = createFilePath({ node, getNode, basePath: `src/pages` })

    // Adjust the slug to account for nested paths
    const adjustedSlug = value.replace(/^\/src\/pages/, '')

    createNodeField({
      name: `slug`,
      node,
      value: adjustedSlug,
    })
  }
}
