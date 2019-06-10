import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { Img } from '@tueri/react'
import './button.css'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allFeedTueriBlog.edges
    const contexts = data.allSitePage.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.title
          const imageNode = contexts.filter(context => context.node.path === node.link.replace('https://tueri.io',''))[0].node.context.image.properties
          return (
            <div key={node.id}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.link.replace('https://tueri.io','')}>
                  {title}
                </Link>
              </h3>
              <small>{node.isoDate}</small>
              <Link style={{ boxShadow: `none` }} to={node.link.replace('https://tueri.io','')}><Img src={imageNode.src} alt={ imageNode.alt } /></Link>
              <p>
                {node.contentSnippet}
              </p>
              <Link className='button' to={node.link.replace('https://tueri.io','')}>Read more</Link>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFeedTueriBlog {
      edges {
        node {
          id
          link
          title
          contentSnippet
          isoDate(formatString: "MMMM DD, YYYY")
        }
      }
    }
    allSitePage(filter: { context: { type: { eq: "blog" } } }) {
      edges {
        node {
          path
          context {
            image {
              properties {
                src
                alt
              }
            }
          }
        }
      }
    }
  }
`
