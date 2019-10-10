import React, { Fragment } from 'react'
import _get from 'lodash/get'
import _format from 'date-fns/format'
import { Link, graphql } from 'gatsby'
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
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="card">
          {title && (
            <h1 itemProp="title">
            {title}  
            </h1>
          )}
          <div className="imagefix">
          <img src={featuredImage} alt={title} />
          </div>
            {categories && (
              <Fragment>
                <span>|</span>
              
                {categories.map((cat, index) => (
                  <span
                    key={cat.category}
                  >
                    {cat.category}
                    {/* Add a comma on all but last category */}
                    {index !== categories.length - 1 ? ',' : ''}
                  </span>
                ))}
              </Fragment>
            )}
        
          <div>
            <Content source={body} />
          </div>
          
          <div style={{fontSize:"12px"}}>          
          {upcomingshows && (
            <h1>
              {upcomingshows}
            </h1>
          )}
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
    >
                  
      <ArtistPostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}

        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
      <a href={post.frontmatter.fbfav}>Facebook</a>
      <br/>
      <a href={post.frontmatter.instafav}>Instagram</a>
      <br/>
      <a href={post.frontmatter.twitterfav}>Twitter</a>
      <br/>
      <a href={post.frontmatter.presskit}>
      <button>PressKit</button>
      </a>
      <iframe width="683" height="384" src={post.frontmatter.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <br/>
        <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src={post.frontmatter.latestmix}></iframe>
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
        video
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
