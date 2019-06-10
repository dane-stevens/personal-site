import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import './code.css'
import rehypeReact from 'rehype-react'
import { Img } from '@tueri/react'
import Helmet from "react-helmet"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "img": Img }
}).Compiler

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.feedTueriBlog
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next, htmlAst } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={post.contentSnippet}
        />
        <Helmet>
          <link rel='canonical' key='canonical' href={post.link} />
        </Helmet>
        <h1>{post.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.isoDate}
        </p>
        {/* <div dangerouslySetInnerHTML={{ __html: post.content.encoded }} /> */}
        {
          renderAst(htmlAst)
        }

        

        <p><i>Originally published at <a href={post.link}>Tueri.io</a></i></p>

        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.link.replace('https://tueri.io','')} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.link.replace('https://tueri.io','')} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    feedTueriBlog( id: { eq: $id }) {
      id
      contentSnippet
      isoDate(formatString: "MMMM DD, YYYY")
      title
      link
      content {
        encoded
      }
    }
  }
`
