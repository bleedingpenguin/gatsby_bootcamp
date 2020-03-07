import React from 'react'
import Layout from '../components/layout'
import { Link, graphql, useStaticQuery } from 'gatsby'

const Blog = () => {
  // {
  //   allMarkdownRemark {
  //     edges {
  //       node {
  //         fields {
  //           slug
  //         }

  //         frontmatter {
  //           title
  //           date
  //         }
  //       }
  //     }
  //   }
  // }
  const data = useStaticQuery(graphql`
    {
      allContentfulBlogPost (sort: {
        fields: publishDate
        order: DESC
      }) {
        edges {
          node {
            title
            slug
            publishDate(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `)

  const edges = data.allContentfulBlogPost.edges

  return (
    <Layout>
      <h1>Blog</h1>
      {edges.map(edge => {
        return (
          <li>
            <Link to={`/blog/${edge.node.slug}`}>
              <h2>{edge.node.title}</h2>
              <p>{edge.node.publishDate}</p>
            </Link>
          </li>
        )
      })}
    </Layout>
  )
}

export default Blog
