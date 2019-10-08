import React from 'react'

const MixTape = ({mixTitle, ...props }) => (
    <div className="video">
      <iframe
        src="https://w.soundcloud.com/player/?"
        title={mixTitle}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    </div>
  )

  export default MixTape