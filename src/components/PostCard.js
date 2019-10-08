import React from 'react'
import { Link } from 'gatsby'
import _format from 'date-fns/format'
import Image from './Image'
import './PostCard.css'

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  date,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {_format(date, 'MMMM Do, YYYY')}
              </time>
            )}
      <div className="PostCard--Category">
        {categories && categories.map(cat => cat.category).join(', ')}
      </div>
      {excerpt && <div className="PostCard--Excerpt">{excerpt}</div>}
    </div>
  </Link>
)

export default PostCard
