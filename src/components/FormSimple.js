import React from 'react'

import './Form.css'

export default ({
  name = 'Simple Form',
  subject = '', // optional subject of the notification email
  method = 'pst'
}) => (
  <form
    name = "contact"
    className='Form'
    method="post"
    data-netlify='true'
    data-netlify-honeypot='bot-field'
  >
    <label className='Form--Label' >
      <input style={{color:'white'}}
        className='Form--Input'
        type='text'
        placeholder='Name'
        name='name'
        required
      />
      <input type="hidden" name="bot-field" />
<input type="hidden" name="form-name" value="contact" />
    </label>
    <label className='Form--Label'>
      <input
        className='Form--Input'
        type='email'
        placeholder='Email'
        name='email'
        required
      />
    </label>
    <label className='Form--Label has-arrow'>
      <select style={{borderColor:'white'}}
        className='Form--Input Form--Select'
        name='type'
        defaultValue='Type of Enquiry'
        required
      >
        <option disabled hidden>
          Type of Enquiry
        </option>
        <option>Bookings Inquiry</option>
        <option>Productions And Events</option>
        <option>General Inquiry</option>
      </select>
    </label>
    <label className='Form--Label'>
      <textarea
        className='Form--Input Form--Textarea'
        placeholder='Message'
        name='message'
        rows='10'
        required
      />
    </label>
    <input type='text' name='_gotcha' style={{ display: 'none' }} />
    {!!subject && <input type='hidden' name='subject' value={subject} />}
    <input type='hidden' name='form-name' value={name} />
    <input
      className='Button Form--SubmitButton'
      type='submit'
      value='Enquire'
    />
  </form>
)
