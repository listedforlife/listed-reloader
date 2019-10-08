import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import ArtistSection from '../components/ArtistSection'
import ArtistCategoriesNav from '../components/ArtistCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (posts, title, contentType) => {
  const isCategory = contentType === 'postCategories2'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const ArtistPageTemplate = ({
  title,
  subtitle,
  fbfav,
  featuredImage,
  posts = [],
  postCategories2 = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
        posts && !!posts.length
          ? byCategory(byDate(posts), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

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
  >
    Roster
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
        excerpt

        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "artists" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            excerpt
            title
            fbfav
            date
            categories {
              category
            }
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
