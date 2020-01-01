import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'
import { SocialIcon } from 'react-social-icons';


export default () => (
  <div >
    <h3 className="taCenter" style={{margin:'14px'}}>
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
    </h3>
    <br />
    <div
    style={{textAlign:'center'}}>
    <a
    className='example_d button'
    href="https://visitor.r20.constantcontact.com/d.jsp?llr=csi9ozbab&p=oi&m=csi9ozbab&sit=zaxq5c9bb&f=56937576-3074-4bab-becd-a2b8ce970e8b" target="_blank">
    <span class="skew-fix">Subscribe</span></a>
    </div>
    <br />
    <InstagramFeed count="8" />
    <footer className="footer">
      <div className="container taCenter">
        <span style={{color:'white'}}>
          © Copyright Listed {new Date().getFullYear()} All rights reserved.{' '}
        </span>
      </div>
    </footer>
  </div>
)
