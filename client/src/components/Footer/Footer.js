import React from 'react'
import "./Footer.scss"

const Footer = () => {
    return (
        <div className="footerdiv">
            <h2>Alpine Stationeries</h2>
            <p>Get High Discounts and Free One Day Delivery</p>
            <span>
            <i class="fab fa-instagram fa-2x"></i>
            </span>
            <span>
            <i class="fab fa-facebook fa-2x"></i>
            </span>
            <span>
            <i class="fab fa-whatsapp-square fa-2x"></i>
            </span>
            <p>
            <i class="fas fa-phone-volume"></i><span>+91 8668631743</span>
            </p>
            <p>
             <i class="fa fa-envelope" aria-hidden="true"></i><span>alpinestationery@gmail.com</span>
            </p>
            <p>
            <i class="fas fa-map-marker-alt"></i><span>Rachnakar Colony, Near Deogiri College</span>
            </p>
            <p>
           <span>Designed and Developed By<span style={{color:"darkred",fontWeight:"bold"}}>TechGeeks</span></span>
            </p>
        </div>
    );
}

export default Footer;