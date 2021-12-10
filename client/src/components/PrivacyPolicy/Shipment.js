import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
const Shipment = () => {
    return (
        <div>
             <Header id="9" />
             <div style={{margin:"0 5%"}}>
             <center><h2 style={{fontSize:"3em"}}><strong>Shipping Policy</strong></h2></center>
           <p style={{lineHeight:"2"}}>
           Items will be shipped within 24 hours of the moment it's ordered.
           <p>If you don't receive the correct item then you should apply for a return</p>
           <p>If in case the delivery boy dosen't deliver the order within 24 hours then we will take action against him if it's delayed due to 
               unnecessary circumstances 
           </p>
           </p>
             </div>
             <Footer />
        </div>
    );
}

export default Shipment;