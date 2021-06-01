import React from 'react'
import { Link } from 'gatsby'

import './NavLink.css'

export default ({ className, children, ...props }) => {

  return (
    <>
      <Link {...props} className={`NavLink ${className || ''}`}>
          {children}
        </Link>
    </>
  )
}
