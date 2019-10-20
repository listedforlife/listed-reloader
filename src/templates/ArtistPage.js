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
const ArtistPage = ({ data: { page, posts, postCategories2 } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  ><div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(51,9,121,1) 35%, rgba(0,212,255,1) 100%)',
              margin:'30px'}}>
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
      postCategories2={postCategories2.edges.map(post => ({
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
    postCategories2: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories2" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
