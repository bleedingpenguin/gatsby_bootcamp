import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// query ($slug: String!){
//   markdownRemark (fields: {
//     slug: {
//       eq: $slug
//     }
//   }) {
//     frontmatter {
//       title
//       date
//     }
//     html
//   }
// }

export const query = graphql`
query ($slug: String!){
  contentfulBlogPost (
    slug: {
      eq: $slug
    }
  ) {
    title
    publishDate(formatString: "MMMM Do, YYYY")
    body {
      json
    }
  }
}
`

const Blog = (props) => {
  // const markdownRemark = props.data.markdownRemark
  const contentful = props.data.contentfulBlogPost

  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title['en-US']
        const url = node.data.target.fields.file['en-US'].url
        return <img alt={alt} src={url} />
      }
    }
  }

  return (
    <Layout>
      {/* <h1>{markdownRemark.frontmatter.title}</h1>
      <p>{markdownRemark.frontmatter.date}</p>
      <div dangerouslySetInnerHTML={{__html: markdownRemark.html}} /> */}
      <h1>{contentful.title}</h1>
      <p>{contentful.publishDate}</p>
      { documentToReactComponents(contentful.body.json, options) }
    </Layout>
  )
}

export default Blog
