import React from 'react'
import { graphql } from 'gatsby'
import './EnterPage.css'
import ra from '../../static/images/ra.png'
import mainone from '../../static/images/mainone.png'
import { SocialIcon } from 'react-social-icons';


// Export Template for use in CMS preview
export const EnterPageTemplate = ({}) =>  (
  <div>
    <div id="wrapper" id='test'>
  <header id="header">
    <div><p></p>
      <div className="centerAll">
    <span className="avatar"><img src={mainone} alt="" /></span></div>
    <div className="container2" >
              <i className="everlib-logo-spacem3"></i>
              <i className="everlib-logo-first-bar"></i>
              <i className="everlib-logo-second-bar"></i>
              <i className="everlib-logo-third-bar"></i>
              <i className="everlib-logo-fourth-bar"></i>
              <i className="everlib-logo-fifth-bar"></i>
              <i className="everlib-logo-spacem"></i>
              <i className="everlib-logo-six-bar"></i>
              <i className="everlib-logo-seventh-bar"></i>
              <i className="everlib-logo-eighth-bar"></i>
              <i className="everlib-logo-ninth-bar"></i>
              <i className="everlib-logo-tenth-bar"></i>
              <i className="everlib-logo-elleventh-bar"></i>
              <i className="everlib-logo-twelfth-bar"></i>
              <i className="everlib-logo-thirteenth-bar"></i>
              <i className="everlib-logo-fourteenth-bar"></i>
              <i className="everlib-logo-fifteenth-bar"></i>
              <i className="everlib-logo-sixteenth-bar"></i>
              <i className="everlib-logo-seventeenth-bar"></i>
              <i className="everlib-logo-eighteenth-bar"></i>
              <i className="everlib-logo-ninteenth-bar"></i>
              <i className="everlib-logo-twenty-bar"></i>
              <i className="everlib-logo-twentyone-bar"></i>
              <i className="everlib-logo-twentytwo-bar"></i>
              <i className="everlib-logo-twenty-three"></i>
              <i className="everlib-logo-twenty-four"></i>
              <i className="everlib-logo-twenty-five"></i>
              <i className="everlib-logo-spacem2"></i>

              <i className="everlib-logo-twenty-six"></i>
              <i className="everlib-logo-twenty-seven"></i>
              <i className="everlib-logo-twenty-eight"></i>
              <i className="everlib-logo-twenty-nine"></i>
              <i className="everlib-logo-thirty"></i>
              <i className="everlib-logo-thirty-one"></i>
              <i className="everlib-logo-thirty-two"></i>
              <i className="everlib-logo-thirty-three"></i>
              <i className="everlib-logo-thirty-four"></i>
              <i className="everlib-logo-thirty-five"></i>

              <i className="everlib-logo-spacem2"></i>
              <i className="everlib-logo-thirty-six"></i>
              <i className="everlib-logo-thirty-seven"></i>
              <i className="everlib-logo-thirty-eight"></i>
              <i className="everlib-logo-thirty-nine"></i>
              <i className="everlib-logo-forty"></i>
              <i className="everlib-logo-forty-one"></i>
              <i className="everlib-logo-forty-two"></i>
              <i className="everlib-logo-forty-three"></i>
              <i className="everlib-logo-forty-four"></i>
              <i className="everlib-logo-forty-five"></i>
              <i className="everlib-logo-space"></i>

              <i className="everlib-logo-forty-six"></i>
              <i className="everlib-logo-forty-seven"></i>
              <i className="everlib-logo-forty-eight"></i>
              <i className="everlib-logo-forty-nine"></i>
              <i className="everlib-logo-fifty"></i>
              </div>
              <br/><br/>
              <audio id="audio1" src="images/sakura2.wav" type="audio/wav" />
              <ul className="icons" style={{marginLeft: '-15px' }}>
                <li><SocialIcon url="https://www.facebook.com/listedbookings"  style={{ height: 25, width: 25 }} /></li>
                <li><SocialIcon url="https://www.instagram.com/areulisted"  style={{ height: 25, width: 25 }} /></li>
                <li><SocialIcon  url="https://twitter.com/areulisted"  style={{ height: 25, width: 25, }} /></li>
                <li><a href="https://www.residentadvisor.net/promoter.aspx?id=91" ><img src={ra} style={{marginRight: '12px', width: 28, marginBottom: '-8px' }} /></a></li>
                <li><SocialIcon  url="mailto:gunita@listedbokings.com"  style={{marginLeft: '-14px', height: 25, width: 25, }} /></li>
              </ul>
      </div>
      <a style={{margin:'25px', textAlign:'center', marginRight:"41px", textDecoration:'none'}} href='/home' className="example_d" >
      ENTER
      </a>
                <footer id="footer">
            <p>&copy; Listed Productions. All rights reserved.</p>
          </footer>
          </header>
    </div>
    </div>
)

const EnterPage = ({ data: { page } }) => (
    <EnterPageTemplate  />
)

export default EnterPage

export const pageQuery = graphql`
  query EnterPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
      }
    }
  }
`
