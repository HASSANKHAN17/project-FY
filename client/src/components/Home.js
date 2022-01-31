import React from 'react'
import "./Home.scss"
import Header from './Header/Header'
import stationaries from '../Images/stationery.png'
import books from '../Images/book.png'
import Footer from './Footer/Footer'
import Alpine from '../Images/Group 12.png'
import axios from 'axios'
import {addToCart} from './redux/cart/CartActions'
import {connect} from 'react-redux'
import {animated, useSpring} from 'react-spring'
import highondiscount from './Assets/highondiscount.json'
const Home = (props) => {
    React.useEffect(() =>{
        axios.post("/count/increaseCount")
    },[])
    const [stylesa,animate] = useSpring(()=>({opacity:0}))
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
        <div className="homeonediv">
            <Header id='1' />

            <div style={{textAlign:"center"}}>
            <img src={Alpine} alt="alpine" id="alpine" />
            </div>


        <div className="shopnowdiv">

        <h2 className="heading">Shop Now <i className=" fa fa-shopping-bag" aria-hidden="true"></i></h2>

        <div className="row ">
            <div onClick={()=>props.history.push("/stationaries")} className="homeheadcards shadow-lg col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                <img src={stationaries} alt="stationaries" />
                <h3 >Stationery</h3>
            </div>
            <div onClick={()=>props.history.push("/books")} className="homeheadcards shadow-lg col-xs-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
                <img src={books} alt="books" />
                <h3>Book's</h3>
            </div>
        </div>
        </div>

        <div className="trendingitemsdiv" style={{color:"#006141"}}>
            <h2>Trending Item's</h2>
            <div className="row countRow ">
            {
                    highondiscount.trendingitems.map(item=>(
                     <div className="col3">
                <img style={{height:150,width:100,marginBottom:10}} src={`/Images/${item.img}.jpg`} alt="trimax" />
                    <h6>{item.name}</h6>
                    <p>Price:{item.price}</p>
                    <p>MRP:{item.MRP}</p>
                    <animated.div style={stylesa} className="displaycount">{displayCount(item)!==null?<animated.div>Added: {displayCount(item)}</animated.div>:null}</animated.div>
                    <center><button 
                    onClick={()=>{
                        animate({delay:100,opacity:1})
                        setTimeout(() => {
                            animate({delay:500,opacity:0})
                        }, 3000);
                        props.addItem(item)}}
                    style={{padding:"2% 18%"}} className="blackbutton"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button></center>
                </div> 
                    ))
                }
            </div>
        </div>


        <div className="trendingitemsdiv">
            <h2>Most Bought Item's</h2>
            <div className="row countRow ">
            {
                    highondiscount.mostboughtitem.map(item=>(
                     <div className="col3">
                <img style={{height:150,width:100,marginBottom:10}} src={`/Images/${item.img}.jpg`} alt="trimax" />
                    <h6>{item.name}</h6>
                    <p>Price:{item.price}</p>
                    <p>MRP:{item.MRP}</p>
                    <animated.div style={stylesa} className="displaycount">{displayCount(item)!==null?<animated.div>Added: {displayCount(item)}</animated.div>:null}</animated.div>
                    <center><button 
                    onClick={()=>{
                        animate({delay:100,opacity:1})
                        setTimeout(() => {
                            animate({delay:500,opacity:0})
                        }, 3000);
                        props.addItem(item)}}
                    style={{padding:"2% 18%"}} className="blackbutton"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button></center>
                </div> 
                    ))
                }
            </div>
        </div>

        <div className="trendingitemsdiv">
            <h2>Discount items</h2>
            <div className="row countRow ">
                
                {
                    highondiscount.highondiscount.map(item=>(
                     <div className="col3">
                <img style={{height:150,width:100,marginBottom:10}} src={`/Images/${item.img}.jpg`} alt="trimax" />
                    <h6>{item.name}</h6>
                    <p>Price:{item.price}</p>
                    <p>MRP:{item.MRP}</p>
                    <animated.div style={stylesa} className="displaycount">{displayCount(item)!==null?<animated.div>Added: {displayCount(item)}</animated.div>:null}</animated.div>
                    <center><button 
                    onClick={()=>{
                        animate({delay:100,opacity:1})
                        setTimeout(() => {
                            animate({delay:500,opacity:0})
                        }, 3000);
                        props.addItem(item)}}
                    style={{padding:"2% 18%"}} className="blackbutton"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button></center>
                </div> 
                    ))
                }
                {/* <div className="col-3">
                <img style={{height:150,width:100,marginBottom:10}} src="/Images/youvawoodenboard.jpg" alt="trimax" />
                    <h6>Wooden Exam Board</h6>
                    <p>Price:105</p>
                    <p>MRP:125</p>
                    <animated.div style={stylesa} className="displaycount">{displayCount(item)!==null?<animated.div>Added: {displayCount(item)}</animated.div>:null}</animated.div>
                    <center><button 
                    onClick={()=>{
                        animate({delay:100,opacity:1})
                        setTimeout(() => {
                            animate({delay:500,opacity:0})
                        }, 3000);
                        props.addItem(item)}}
                    style={{padding:"2% 18%"}} className="blackbutton"><i className="fa fa-cart-plus" aria-hidden="true"></i> Add To Cart</button></center>
                </div> */}
            </div>
        </div>


        <div className="brief">
            <h2>Brief About Alpine stationery </h2>
            <p>
                Alpine Stationery is an aurangabad based e-commerce store which
                provides delivery within a day to the residents of aurangabad
                with wide variety of product's and payment options with flexible 
                returns.
            </p>
        </div>

        <div className="customers">
            <h2>Happy Customer's</h2>
            <div className="row">
                <div className="shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h4>HASSAN </h4>
                    <h6>CEO at TechGeeks</h6>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <p>
                    I've been a part of alpine enterprises since a long time. This solution of providing one day delivery to the people of Aurangabad is upto the mark and alpine stationery aims to deliver the product within one day + they give high discounts compare to other sellers
                    </p>
                </div>
                <div className="shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h4>Giri Shantanu</h4>
                    <h6>Principal at Dr. DS Paliwagh Junior College of Education</h6>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <p>
                    Alpine Stationery do what they say. Their service is really good and even the product quality is really good. The thing which i really liked about alpine statonery is flexible returns on each and every product.
                    </p>
                </div>
                <div className="shadow col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <h4>Shaikh Rais</h4>
                    <h6>Principal at Sarosh School Jinsi</h6>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <span style={{color:"#ffc93c"}}>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    </span>
                    <p>
                    Had a Wonderful Experience and Great Service 
                    </p>
                </div>
            </div>
        </div>

<Footer />

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

export default connect(mapStateToProps,mapDispatchToProps)(Home);
