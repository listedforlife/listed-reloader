import React from 'react'
import _format from 'date-fns/format'
import Image from './Image'
import './PostCard.css'

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  date,
  url,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <div>
  <a href={url}  target="_blank" rel="noopener noreferrer" className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {_format(date, 'MMMM Do, YYYY')}
              </time>
            )}
    </div>
  </a>
      {excerpt && <p className="PostCard--excerpt">{excerpt}</p>}
</div>
      )

export default PostCard
