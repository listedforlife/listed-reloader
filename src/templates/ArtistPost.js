import React, { Fragment } from 'react'
import _get from 'lodash/get'
import {graphql, Link } from 'gatsby'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './ArtistPost.css'
import './ArtistPost.scss'
import { SocialIcon } from 'react-social-icons';
import ra from '../../static/images/ra.png'

import randomColor from 'randomcolor';


export const ArtistPostTemplate = ({
  title,
  body,
  scwidg,
  featuredImage,
  videowidg,
  categories = [],
}) => (
  <main>
    <article
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="card rainbow"  >
        <div className='htoone' id="demo">
          <div className="img2 shadow item">
          <img className="thisone"src={featuredImage} alt={title} />    
          </div>
          </div>
          </div>
            {categories && (
              <Fragment>
                <span></span>
              
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
          {title && (
            <h1
            itemProp="title" className="artistTitle">
            {title}  
            </h1>
          )}
        <div className="text-holder right">
        <div className="pg1-2-txt">
            <p>
            <Content source={body} />
            </p>
            </div>
      </div>
                  <div className="marginbox">          
          
          {videowidg && (<iframe title="video widget" className="vid"   src={videowidg} frameBorder="0" 
          allow="accelerometer; autoplay; 
          encrypted-media; gyroscope; picture-in-picture" 
          ></iframe>)}
          <iframe src={scwidg} title="sc widget" className="sc"  style={{backgroundColor:'black'}} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
      <div className="marginbox">
      <div>
      <div className="scroll">
      <p>
      <h1 className="shows">Upcoming Shows</h1>
      {post.frontmatter.upcomingshows}</p>
      </div>
      </div>
      </div>
      <div style={{textAlign:'center',
      }}>
      <a style={{margin:'30px', textAlign:'center', textDecoration:'none'}} className="example_d button" href={post.frontmatter.presskit} >
      <span className="skew-fix artistBTN">Presskit</span>
      </a>
      <a style={{margin:'30px',textAlign:'center',  textDecoration:'none'}} href='mailto:gunita@listedbookings.com' className="example_d button" >
      <span className="skew-fix artistBTN">Book Artist</span>
      </a>
      </div>
      <div className='smlist' style={{display:'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   textDecoration: 'none'
                   }}>
      <ul>
      <SocialIcon url={post.frontmatter.sclk} style={{ height: 25, width: 25 }}  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <SocialIcon url={post.frontmatter.spotifylk} style={{ height: 25, width: 25 }}  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <SocialIcon url={post.frontmatter.fblk} style={{ height: 25, width: 25 }}  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <SocialIcon url={post.frontmatter.instalk} style={{ height: 25, width: 25 }}  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href={post.frontmatter.ralk} ><img src={ra} style={{ width: 25, marginBottom: '-8px' }} /></a>
     </ul>
      </div>
      <div style={{textAlign:'center', width:'100%'}}>
      <iframe className="spotifyc" title="spotify widget"  width="80%" height="300px" scrolling="no" 
           frameBorder="no" allow="autoplay" 
           src={post.frontmatter.spotifywidg}></iframe>   
    </div>
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
        spotifywidg
        fblk
        instalk
        ralk
        twitterlk
        sclk
        spotifylk
        videowidg
        upcomingshows
        presskit
        scwidg
        subtitle
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
