import React from 'react'

import ArtistCard from './ArtistCard'
import './ArtistSection.css'

class ArtistSection extends React.Component {
  static defaultProps = {
    posts: [],
    title: '',
    limit: 50,
    showLoadMore: true,
    loadMoreTitle: 'Load More',
    perPageLimit: 50
  }

  state = {
    limit: this.props.limit
  }

  increaseLimit = () =>
    this.setState(prevState => ({
      limit: prevState.limit + this.props.perPageLimit
    }))

  render() {
    const { posts, title } = this.props,
      { limit } = this.state,
      visiblePosts = posts.slice(0, limit || posts.length)

    return (
      <div className="ArtistSection">
        {title && <h2 className="ArtistSection--Title">{title}</h2>}
        {!!visiblePosts.length && (
          <div className="ArtistSection--Grid">
            {visiblePosts.map((post, index) => (
              <ArtistCard key={post.title + index} {...post} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default ArtistSection
