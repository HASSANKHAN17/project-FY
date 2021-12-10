import React from 'react';
import Header from '../Header/Header'
import "./AboutUs.scss"
const AboutUs = () => {
    return (
        <div>
            <Header id="2" />
            <div className="aboutusdiv">
            <h1>About Us</h1>
            <p className="alpinepara">
            Alpine Stationery is a solution by Alpine Enterprises whose primary goal is to reach the customers as soon as possible and provide Stationery and books at cheap and affordable price only for <b>Aurangabad City</b>.
                Alpine Stationery provides books and Stationery at a wholesale rate which is comparatively lower than other vendors in the market.
                We the team of Alpine believe in quality service to the customers. 
                <br />
                Alpine Stationery is  behind Deogiri Institute of Engineering and Management Studies Aurangabad Maharashtra

											        

            </p>
            <div className="thanku">
            <p>
                
			Thanking you,
            </p>
            <p>
			Team Alpine
            </p>
            </div>


            </div>
        </div>
    );
}

export default AboutUs;