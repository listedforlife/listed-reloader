import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import BackgroundVideo from '../components/BackgroundVideo'
import Gallery from '../components/Gallery'
import Popup from '../components/Popup'

// Export Template for use in CMS preview
export const ProductionsPageTemplate = ({
  subtitle,
  featuredImage,
  section1,
  section2,
  video,
  videoPoster,
  videoTitle,
  gallery
}) => (
  <main className="Prod">
    <PageHeader
      backgroundImage={featuredImage}
    />
    <section className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </section>

    <section className="BackgroundVideo-section section">
      <BackgroundVideo poster={videoPoster} videoTitle={videoTitle}>
        {video && <source src={video} type="video/mp4" />}
      </BackgroundVideo>
    </section>

    <section className="section" class="marginFix">
      <div className="container">
        <h1>Recent Events Gallery</h1>
        <Gallery images={gallery} />
      </div>
    </section>

    <section className="section" class="marginFix">
      <div className="container">
        <Content source={section2} />
      </div>
    </section>

    <section className="section" class="marginFix">
      <div className="container">
        <Popup>
          <Content source={section1} />
        </Popup>
      </div>
    </section>
  </main>
)

const ProductionsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ProductionsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ProductionsPage

export const pageQuery = graphql`
  query ProductionsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      frontmatter {
        template
        featuredImage
        section1
        section2
        video
        videoPoster
        videoTitle
      }
    }
  }
`
