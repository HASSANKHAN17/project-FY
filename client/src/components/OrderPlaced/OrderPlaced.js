import React from 'react';
import Header from '../Header/Header'
import "./OrderPlaced.scss"
import image from './shopping-bag (2).png'
import {setNull} from '../redux/cart/CartActions'
import {connect} from 'react-redux'
const OrderPlaced = (props) => {
    React.useEffect(()=>{
        props.setNull()
    },[])
 
    return (
        <div>
            {/* {renderItems()} */}
            <Header />
            <div className="orderplaced">
            <img src={image} alt="bag" />
            <h1>Order Placed Successfully</h1>
            <p>You can expect your delivery by today</p>
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
export default connect(null,mapDispatchToProps)(OrderPlaced);