import React from 'react'
import { Link } from 'gatsby'

import Image from './Image'
import './ArtistCard.css'

const ArtistCard = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`ArtistCard ${className}`}>
    {featuredImage && (
      <div className="ArtistCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="ArtistCard--Content">
      {title && <h3 className="ArtistCard--Title">{title}</h3>}
      <div className="ArtistCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      
    </div>
  </Link>
)

export default ArtistCard
