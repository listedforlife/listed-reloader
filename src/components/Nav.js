import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import Logo from './Logo'
import { SocialIcon } from 'react-social-icons';


import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    activeSubNav: false,
    currentPath: false
  }

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  render() {
    const { active } = this.state,
      NavLink = ({ to, className, children, ...props }) => (
        <Link
          to={to}
          className={`NavLink ${
            to === this.state.currentPath ? 'active' : ''
          } ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/home/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="smedialinks">
          <span style={{margin:'5px'}}>
          <SocialIcon url="https://www.facebook.com/listedbookings"  style={{ height: 25, width: 25 }} />
          </span>
          <span style={{margin:'5px'}}>
          <SocialIcon url="https://www.instagram.com/areulisted"  style={{ height: 25, width: 25 }} />
          </span>
          <span style={{margin:'5px'}}>
          <SocialIcon  url="https://twitter.com/areulisted"  style={{ height: 25, width: 25, }} />
          </span>
          </div>
          <div className="Nav--Links">
            <NavLink id="navc1" to="/home/">Home</NavLink>
            <NavLink id="navc2" to="/artists/">Artists</NavLink>
            <NavLink id="navc3" to="/productions/">Productions</NavLink>
            <NavLink id="navc4" to="/news/">Buzz</NavLink>
            <NavLink id="navc5" to="/contact/">Contact</NavLink>
         
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            style={{color:'white'}}
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default ({ subNav }) => (
  <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
)


