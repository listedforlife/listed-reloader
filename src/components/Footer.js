import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'
import { SocialIcon } from 'react-social-icons';


export default () => (
  <div >
    <h2 className="taCenter" style={{margin:'14px'}}>
      <br>
      </br>
      <div>
      <span style={{margin:'5px'}}>
      <SocialIcon  url="https://twitter.com/jaketrent" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="https://facebook.com/jaketrent" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="https://instagram.com/jaketrent" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="mailto:webmaster@example.com" />
      </span>
      </div>
    </h2>
    <br />
    <InstagramFeed count="8" />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved.{' '}
        </span>
      </div>
    </footer>
  </div>
)
