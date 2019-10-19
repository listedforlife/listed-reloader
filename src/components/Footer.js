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
      <SocialIcon  url="https://www.facebook.com/listedbookings" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="https://www.instagram.com/areulisted" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="https://twitter.com/areulisted" />
      </span>
      <span style={{margin:'5px'}}>
      <SocialIcon url="mailto:gunita@listedbookings.com" />
      </span>
      </div>
    </h2>
    <br />
    <InstagramFeed count="8" />
    <footer className="footer" style={{backgroundColor:'black'}}>
      <div className="container taCenter">
        <span style={{color:'white'}}>
          © Copyright Listed {new Date().getFullYear()} All rights reserved.{' '}
        </span>
      </div>
    </footer>
  </div>
)
