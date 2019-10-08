import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import Image from '../components/Image'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './ArtistPost.css'

export const ArtistPostTemplate = ({
  title,
  body,
  upcomingshows,
  featuredImage,
  atURL,
  categories = [],
}) => (
  <main>
    <article
      className="ArtistPost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="ArtistPost--BackButton" to="/artists/">
          <ChevronLeft /> BACKasds
        </Link>
        <div className="ArtistPost--Content relative">
          <div className="ArtistPost--Meta">
          <img src={featuredImage} alt={title} />
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                    className="ArtistPost--Meta--Category"
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
          </div>
            
          {title && (
            <h1 className="ArtistPost--Title" itemProp="title">
              {title}
            </h1>
          )}

{upcomingshows && (
            <h1 className="ArtistPost--Title" itemProp="title">
              {upcomingshows}
            </h1>
          )}
        

{atURL && (
            <h1 style={{color:'white'}}>
              {atURL}
            </h1>
          )}

          <div className="ArtistPost--InnerContent">
            <Content source={body} />
          </div>

       
        </div>
      </div>
    </article>
  </main>
)

// Export Default ArtistPost for front-end
const ArtistPost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.url || false}
      upcomingshows={post.frontmatter.upcomingshows || false}
      fbfav={post.frontmatter.fbfav || false}
      instafav={post.frontmatter.instafav || false}
      twitterfav={post.frontmatter.twitterfav || false}
      presskit={post.frontmatter.presskit || false}
      latestmix={post.frontmatter.latestmix || false}

    >
                  
      <ArtistPostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}

        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
      <a>{post.frontmatter.fbfav}</a>
      <br/>
      <a>{post.frontmatter.instafav}</a>
      <br/>
      <a>{post.frontmatter.twitterfav}</a>
      <br/>
      <a>{post.frontmatter.presskit}</a>
      <br/>
      <a>{post.frontmatter.latestmix}</a>
    </Layout>
  )
}

export default ArtistPost

export const pageQuery = graphql`
  ## Query for ArtistPost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query ArtistPost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        featuredImage
        template
        fbfav
        instafav
        twitterfav
        upcomingshows
        presskit
        latestmix
        subtitle
        excerpt
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "artists" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
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
