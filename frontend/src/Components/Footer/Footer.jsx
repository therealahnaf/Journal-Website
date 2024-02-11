import React from 'react'
import './Footer.css'
import ig from '../Assets/instagram_icon.png'
import whatsapp from '../Assets/whatsapp_icon.png'
import email from '../Assets/email.png'
export const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-icon">
            <img src={ig} alt=''/>
            <img src={email} alt=''/>
            <img src={whatsapp} alt=''/>
            <p1>Instagram</p1>
            <p2>moodlog@gmail.com</p2>
            <p3>WhatsApp</p3>
        </div>
    </div>
  )
}
export default Footer;
