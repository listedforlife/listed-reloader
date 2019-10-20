import React from 'react'
import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const PostCategoriesNav = ({enableSearch }) => (
  <div className="PostCategoriesNav">
    

    {enableSearch && <BlogSearch style={{margin:'10px'}} />}
  </div>
)

export default PostCategoriesNav
