import React from 'react'
import CMS from 'netlify-cms'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'

import { ProductionsPageTemplate } from '../templates/ProductionsPage'
import { ContactPageTemplate } from '../templates/ContactPage'

import { BlogIndexTemplate } from '../templates/BlogIndex'
import { ArtistPageTemplate } from '../templates/ArtistPage'

import { SinglePostTemplate } from '../templates/SinglePost'
import { ArtistPostTemplate } from '../templates/ArtistPost'

import {EnterPageTemplate} from '../templates/EnterPage'


if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('productions-page', ({ entry }) => (
  <ProductionsPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('enter-page', ({ entry }) => (
  <EnterPageTemplate {...entry.toJS().data} />
))



CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('blog-page2', ({ entry }) => (
  <ArtistPageTemplate {...entry.toJS().data} />
))

CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))


CMS.registerPreviewTemplate('artists', ({ entry }) => (
  <ArtistPostTemplate {...entry.toJS().data} />
))

