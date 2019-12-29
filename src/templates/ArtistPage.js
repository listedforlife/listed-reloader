import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import ArtistSection from '../components/ArtistSection'
import Layout from '../components/Layout'

export const ArtistPageTemplate = ({

  posts = [],

}) => (
  <Location>
    {() => {
      let filteredPosts =
        posts 

      return (
        <main className="Blog">
          {!!posts.length && (
            <section className="section">
              <div className="container">
                <ArtistSection posts={filteredPosts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default BlogIndex for front-end
const ArtistPage = ({ data: { page, posts } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  ><div>
    <div>
    <h1>Artists</h1>
    </div></div>
    <ArtistPageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default ArtistPage

export const pageQuery = graphql`
  ## Query for ArtistPage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ArtistPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        url
        title
        template
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "artists" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            
            title
            fblk
            date
            featuredImage
          }
        }
      }
    }
  }
`
