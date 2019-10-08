import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import './ArtistCategoriesNav.css'

const ArtistCategoriesNav = ({ categories, enableSearch }) => (
  <div className="ArtistCategoriesNav">
    <Link className="NavLink" exact="true" to={`/artists/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default ArtistCategoriesNav