import React from 'react'
import './Form.css'


const FormSimple2 = () => {

    return (

<form name="listed-contact" 
      className='Form'
      action="post" 
      data-netlify="true"
      netlify-honeypot="bot-field" 
      >
  <p>
    <label className='Form--Label'>Your Name: 
    <input type="text" name="name" /></label>   
  </p>
  <p>
    <label className='Form--Label'>Your Email: 
    <input type="email" name="email" /></label>
  </p>
  <p>
    <label className='Form--Label'>Your Role: 
    <select name="role[]" multiple>
      <option value="leader">Leader</option>
      <option value="follower">Follower</option>
    </select></label>
  </p>
  <p>
    <label className='Form--Label'
    >Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
)
}

export default FormSimple2