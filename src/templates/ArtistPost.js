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
  fblk,
  instalk,
  twitterlk,
  sclk,
  spotifylk,
  spotifywidg,
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
      <div className="card">
        <br/>
        <div className='htoone' className='headers'>
          {title && (
            <h1 style={{textAlign:'center', fontSize:'30px', textTransform:'uppercase'}} 
            itemProp="title">
            {title}  
            </h1>
            
          )}
          </div>
          <div className="img2" className="shadow" className="item">
          <img className="thisone" src={featuredImage} alt={title} />
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
        <div className="text-holder right">
        <div className="pg1-2-txt">
            <br/>
            <p>
            <Content source={body} />
            </p>
            </div>
      </div>
                  <div className="marginbox">          
                    
                    <div style={{ marginLeft:'60px', borderColor:'white', border:'3px'}}>
          
          {videowidg && (<iframe className="vid"  src={videowidg} frameborder="0" 
          allow="accelerometer; autoplay; 
          encrypted-media; gyroscope; picture-in-picture" 
          ></iframe>)}
          <iframe src={scwidg} className="vid"  style={{backgroundColor:'black'}} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
    >
                  
      <ArtistPostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        

        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
      <div className="marginbox">
      <div style={{textAlign:'center', marginLeft:'60px'}}>
      <div className="scroll">
      <p>
      __________________________________   
      <br/>Upcoming Shows<br/>
      __________________________________ <br/>
      {post.frontmatter.upcomingshows}</p>
      </div>
      </div>
      </div>
      <br/>
      <div style={{textAlign:'center',
      }}>
      <a style={{margin:'30px', textAlign:'center', textDecoration:'none'}} className="doingit" href={post.frontmatter.presskit} className="example_c">
      Presskit
      </a>
      <a style={{margin:'30px',textAlign:'center', textDecoration:'none'}} className="doingit" href={post.frontmatter.presskit} className="example_c">
      Book Artist
      </a>
      </div>
      <div className='smlist' style={{display:'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   }}>
      <ul>
      <a href={post.frontmatter.sclk}  > Soundcloud </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href={post.frontmatter.spotifylk}  > Spotify </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href={post.frontmatter.fblk}  > Facebook </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href={post.frontmatter.instalk}  > Instagram </a>
     </ul>
      </div>
      <br/>
      <div style={{textAlign:'center'}}>
      _________________________________________________________________________________________________________________________________
      <br/><br/>
      <iframe className="spotifyc"  width="80%" height="300px" scrolling="no" 
           frameborder="no" allow="autoplay" 
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
        twitterlk
        sclk
        spotifylk
        videowidg
        upcomingshows
        presskit
        scwidg
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
