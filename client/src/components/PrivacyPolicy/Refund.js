import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
const Refund = () => {
    return (
        <div>
             <Header id="8" />
             <div style={{margin:"0 5%"}}>
             <center><h2 style={{fontSize:"3em"}}><strong>Refund Policy</strong></h2></center>
           <p style={{lineHeight:"2"}}>
           <h4>Items will not be returned in case if:</h4>
           <ul>
               <li>there are defects</li>
               <li>the item is damaged</li>
           </ul>
           <h4>Cancellation Policy:</h4>

           <p style={{lineHeight:"2"}}>
           Products can be cancelled after the order is placed. If the payment mode was online then the amount will be refunded within 7 days in your account so, in order to get a refund, provide correct bank details.

If payment is cancelled due to some bank issues or some other reasons, then the user will be asked to do the payment again. Alpine Enterprises will not be responsible if payment is cancelled by the bank and money is deducted.
</p>
<h4>Refund Policy:</h4>
<p style={{lineHeight:"2"}}>
Refund will be done within 7 days from the date product is cancelled for cancellation and as well as for a return. Alpine Enterprises will not be responsible if wrong bank details are provided and if money is deposited to a different account because of wrong details
</p>
           </p>
             </div>
             <Footer />
        </div>
    );
}

export default Refund;