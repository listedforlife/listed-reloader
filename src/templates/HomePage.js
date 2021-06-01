import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import PostSection from '../components/PostSection'
import Layout from '../components/Layout'
import './HomePage.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// Export Template for use in CMS preview
export const HomePageTemplate = ({
  subT = [],
  subtitle,
  listedmix,
  listedmixlk,
  posts = [],
  artists = []
}) => (
  <Location>
    {() => {
      return (
        <main className="Blog">
          <section className="section hide">
            <div className="container"></div>
          </section>
          <section className="section">
            <div className="container">
              <PostSection posts={posts} />
            </div>
          </section>
          <div>
            <h1> {listedmix}</h1>
            <iframe
              title="listed-playlist"
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={listedmixlk}
            ></iframe>
            <div>
              <div className="home-artists-links" style={{}}>
                <h1>Artists</h1>

                {
                  (subT = (
                    <div style={{ textAlign: 'center' }}>
                      <p>
                        {artists.map(artist => (
                          <a style={{ marginRight: '1em' }} key={artist.slug} href={artist.slug}>
                            {artist.title.trim()}
                          </a>
                        ))}
                      </p>
                    </div>
                  ))
                }
                <div className="dropdown">
                  <button
                    className="dropdown-button"
                    style={{ visibility: 'hidden' }}
                  >
                    Artists
                  </button>
                  <div className="dropdown-list"></div>
                </div>
              </div>
              <div
                className="ctct-inline-form"
                data-form-id="77fa4a78-f78b-4c9b-9057-b015694f8ed3"
              ></div>
            </div>
          </div>
        </main>
      )
    }}
  </Location>
)

function SlideContent({ url }) {
  const [type, setType] = useState('')
  useEffect(() => {
    getType(url)
  }, [])
  async function getType(url) {
    const res = await fetch(url)
    setType(res.headers.get('Content-Type'))
  }
  return (
    <>
      {type && type.includes('image') && <img src={url} />}
      {type && type.includes('video') && <video controls src={url}></video>}
    </>
  )
}

// Export Default BlogIndex for front-end
const HomePage = ({ data: { page, posts, artists } }) => {
  console.log(page.frontmatter.featuredImage6);


  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2800,
    speed: 2800,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Layout
      meta={page.frontmatter.meta || false}
      title={page.frontmatter.title || false}
    >
      <div className="fixcenter">
        <Slider {...settings} className="slider">
          <div className="slide">
            <SlideContent url={page.frontmatter.featuredImage} />
          </div>
          <div className="slide">
            <SlideContent url={page.frontmatter.featuredImage2} />
          </div>
          <div className="slide">
            <SlideContent url={page.frontmatter.featuredImage3} />
          </div>
          <div className="slide">
            <SlideContent url={page.frontmatter.featuredImage4} />
          </div>
          <div className="slide">
            <SlideContent url={page.frontmatter.featuredImage5} />
          </div>
          <div className="slide">
            <SlideContent url={page.frontmatter.featuredImage6} />
          </div>
        </Slider>
        {/* <div className="slider">
          <div
            className="slide1"
            style={{
              background: `url(${page.frontmatter.featuredImage})no-repeat center`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div
            className="slide2"
            style={{
              background: `url(${page.frontmatter.featuredImage2})no-repeat center`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div
            className="slide3"
            style={{
              background: `url(${page.frontmatter.featuredImage3})no-repeat center`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div
            className="slide4"
            style={{
              background: `url(${page.frontmatter.featuredImage4})no-repeat center`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div
            className="slide5"
            style={{
              background: `url(${page.frontmatter.featuredImage5})no-repeat center`,
              backgroundSize: 'cover'
            }}
          ></div>
        </div> */}
      </div>
      <h1>Buzz</h1>

      <HomePageTemplate
        {...page}
        {...page.fields}
        {...page.frontmatter}
        posts={posts.edges.map(post => ({
          ...post.node,
          ...post.node.frontmatter,
          ...post.node.fields
        }))}
        artists={artists.edges.map(artist => ({
          title: artist.node.frontmatter.title,
          slug: artist.node.fields.slug
        }))}
      />
    </Layout>
  )
}

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
        date
        template
        subtitle
        featuredImage
        featuredImage2
        featuredImage3
        featuredImage4
        featuredImage5
        featuredImage6
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
            featuredImage
          }
        }
      }
    }

    artists: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "artists" } } }
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
