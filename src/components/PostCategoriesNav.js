import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const PostCategoriesNav = ({enableSearch }) => (
  <div className="PostCategoriesNav">
    

    {enableSearch && <BlogSearch style={{margin:'10px'}} />}
  </div>
)

export default PostCategoriesNav
