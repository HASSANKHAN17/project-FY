import React from 'react';
import Header from '../Header/Header'
import "./OrderPlaced.scss"
import image from './shopping-bag (2).png'
import {setNull} from '../redux/cart/CartActions'
import {connect} from 'react-redux'
const OrderStatus = (props) => {
  console.log(props.location.state.heading);
 
    return (
        <div>
            {/* {renderItems()} */}
            <Header />
            <div className="orderplaced">
            <img src={image} alt="bag" />
            <h1>{props.location.state.heading}</h1>
            <p>{props.location.state.content}</p>
            <button className="blackbutton" onClick={()=>props.history.push("/")}>Continue Shopping <span style={{marginLeft:10}}><i class="fa fa-shopping-basket" aria-hidden="true"></i></span></button>
            </div>
        </div>
    );
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setNull:()=>dispatch(setNull())
    }
}
export default connect(null,mapDispatchToProps)(OrderStatus);