/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

// module.exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === 'MarkdownRemark') {
//     const slug = path.basename(node.fileAbsolutePath, '.md')

//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug
//     })
//   }
// }

// {
//   allMarkdownRemark {
//     edges {
//       node {
//         fields {
//           slug
//         }
//       }
//     }
//   }
// }


module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogTemplates = path.resolve('src/templates/blog.js')

  const res = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  res.data.allContentfulBlogPost.edges.forEach((edge) => {
    createPage({
      component: blogTemplates,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}