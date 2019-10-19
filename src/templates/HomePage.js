import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import Content from '../components/Content'
import PostSection from '../components/PostSection'
import Layout from '../components/Layout'
import './HomePage.css'
import ReactMarkdown from 'react-markdown'

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
  const isCategory = contentType === 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const HomePageTemplate = ({ 
  title,
  body,
  subtitle,
  listedmix,
  listedmixlk,
  posts = [],
}) => (
  <Location>
    {({ }) => {
      let newposts =
        posts
      return (
        <main className="Blog">
<section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
            <section className="section">
              <div className="container">
                <PostSection posts={newposts} />
              </div>
            </section>
            <div>
    <div style={{paddingLeft:'45px', margin:'15px', marginBottom:'-80px', fontSize:'25px'}}> {listedmix}</div>
    <br/><br/><br/><br/>
    <iframe title="listed-playlist" width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={listedmixlk}></iframe>
    <div style={{background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(20,35,51,1) 100%)', 
    textAlign:'center', textDecoration:'none', margin:'10px', padding:'10px'}}    
    >
    <h1>Artists</h1>
    <ReactMarkdown source={subtitle} />
    </div>
    </div>
        </main>
      )
    }}
    
  </Location>
  
)

// Export Default BlogIndex for front-end
const HomePage = ({ data: { page, posts, postCategories
 } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}>
       <div className='slider'>


</div>
<div style={{paddingLeft:'45px', margin:'15px', marginBottom:'-80px', fontSize:'25px'}}> Fresh News</div>

    <HomePageTemplate

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

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {

    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      fields {
        contentType
      }
      frontmatter {
        title
        listedmix
        listedmixlk
        excerpt
        date
        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            url
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
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

