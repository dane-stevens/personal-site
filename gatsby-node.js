const path = require(`path`)
// const { createFilePath } = require(`gatsby-source-filesystem`)
const rehype = require('rehype')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allFeedTueriBlog(
          sort: { fields: [pubDate], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              title
              link
              pubDate
              contentSnippet
              categories
              content {
                encoded
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allFeedTueriBlog.edges

    posts.forEach((post, index) => {

      // console.log(post)
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      const path = post.node.link.replace('https://tueri.io', '')

      const htmlAst = rehype().parse(post.node.content.encoded).children[0].children[1]
      const image = htmlAst.children[0].children[0]

      createPage({
        path,
        component: blogPost,
        context: {
          id: post.node.id,
          previous,
          next,
          htmlAst,
          image,
          type: 'blog'
        },
      })
    })

    return null
  })
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   console.log(node.internal.type)
//   if (node.internal.type === `FeedTueriBlog`) {
//     const value = createFilePath({ node, getNode })
//     console.log('SLUG',value)
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }
