import React, { Component, Fragment } from 'react'
import { X } from 'react-feather'

import './Popup.css'

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = { showPopup: false }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    const { children } = this.props
    return (
      <Fragment>
        <div className="taCenter">
          <h3> are u listed?</h3>
          <div className="example_d" onClick={this.togglePopup.bind(this)}>
            Click For More Info
          </div>
        </div>

        {this.state.showPopup ? (
          <div className="Popup-Overlay">
            <div
              className="Popup-Background"
              onClick={this.togglePopup.bind(this)}
            ></div>
            <div className="Popup-Inner">
              <X className="Popup-Close" onClick={this.togglePopup.bind(this)} />
              {children}
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default Popup
