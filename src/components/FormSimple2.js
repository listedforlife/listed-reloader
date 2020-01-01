import React from 'react'
import './Form.css'


const FormSimple2 = () => {

    return (

<form name="listed" 
      className='Form'
      method="post" 
      data-netlify="true" 
      >  
      
      <input type="hidden" name="bot-field" />  
      <input type="hidden" name="form-name" value="listed" />  
    
    <label className='Form--Label' htmlFor="name"></label>
    <input 
      style={{color:'white'}}
      type="text" 
      name="name" 
      id="name"
      placeholder='Name'
      className='Form--Input'
           />
  
    <label className='Form--Label' htmlFor="email"></label>
    <input 
        type="text" 
        name="email" 
        id="email"
        placeholder='Email'
        className='Form--Input'
        />

    <label className='Form--Label has-arrow'>
      <select 
        
        className='Form--Input Form--Select'
        name='type'
        defaultValue='Type of Inquiry'
        id="inquiry"
      >
        <option disabled hidden>
                Type of Inquiry </option>
        <option>Bookings Inquiry</option>
        <option>Productions And Events</option>
        <option>General Inquiry</option>
      </select>
    </label>
    <label 
      className='Form--Label' 
      htmlFor="message"></label>
   
    <textarea 
    name="message" 
    id="message" 
    placeholder='Message'
    className='Form--Input Form--Textarea'
    rows='10'

     />
    <div data-netlify-recaptcha="true">
    </div>
    
    <button name="contactSubmitButton" id="contactSubmitButton" type="submit" class="example_d button">  
    <span class="skew-fix">Send</span>
    </button>  
      
</form>
)
}

export default FormSimple2