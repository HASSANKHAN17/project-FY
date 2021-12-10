import React from 'react'
import "./SectionCard.scss"
import Header from '../Header/Header'
import {addToCart} from '../redux/cart/CartActions'
import {connect} from 'react-redux'
import {animated, useSpring} from 'react-spring'
import Copy from './copy.png'
const SectionDetail = (props) => {
    let card = React.useRef()
    let products = props.history.location.state.value
    const [animProps,setAnimProps] = useSpring(()=>({to:{opacity:1},from:{opacity:0},delay:1000}))
    const [stylesa,animate] = useSpring(()=>({opacity:0}))
    const [toggle,setToggle] = React.useState(false)
    let count = 0
    const displayCount = (item)=>{
        count = props.cart.items.filter(e=>{
            if(e===item){
                console.log("lksdjfkljsdlkfjsdlkfjdklsjf",e)
                return e.quantity
            }
        })
        console.log(count)
     return count.length===0?null:count[0].quantity;
    }


    return (
        <div className="cardDetail">
            <Header />
          
        <h1>{props.history.location.state.name}</h1>
        <div className="row">
        {//class
            products.map(item=>(
                <div className="shadow col-sm-12 col-xs-12 col-md-4 col-lg-2 col-xl-2 carddiv" key={item.name}>
                    {props.history.location.state.name==="Nursury & KG"?<img src={`Images/${item.img}`} alt="" />:<img src={`Images/${item.img.replace(" ","")+".jpg"}`} alt="" />}
                    <h4>{item.name}</h4>
                    <p className="price">Price: ₹{item.price}</p>
                    <p className="discount">MRP: ₹{item.MRP}</p>
                    {item.color?<p>Colour:{item.color}</p>:null}
                   <animated.div style={stylesa} className="displaycount">{displayCount(item)!==null?<animated.div>Added: {displayCount(item)}</animated.div>:null}</animated.div>
                    <button onClick={()=>{
                        animate({delay:100,opacity:1})
                        setTimeout(() => {
                            animate({delay:500,opacity:0})
                        }, 3000);
                        props.addItem(item)}} className="blackbutton"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button>
                       
                </div>
            ))
        }
        </div>
        </div>
    );
}

const mapDispatchToProps = dispatch =>{
    return {
        addItem:item=>dispatch(addToCart(item))
    }
}

const mapStateToProps=({cart})=>{
    return {
        cart
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( SectionDetail);