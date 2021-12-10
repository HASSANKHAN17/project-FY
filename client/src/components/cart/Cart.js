import React from 'react'
import "./Cart.scss"
import Header from '../Header/Header'
import {connect} from 'react-redux'
import {incrementItem,deleteItem} from '../redux/cart/CartActions'
import {decrementItem} from '../redux/cart/CartActions'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Footer from '../Footer/Footer'

const Cart = (props) => {
    console.log("------------------------start--------------------")
    const [option,setOption] = React.useState("COD")
    const [address,setAddress] = React.useState(null)
    const [addressvalue,setAddressValue] = React.useState("")
    const [number,setNumber] = React.useState("")
    const [error,setError] = React.useState("")
    const [message,setMessage]=React.useState("")
    console.log(addressvalue,number);
    const {register,handleSubmit,formState:{errors}}=useForm()
    const onSubmit = (data)=>{
        console.log(data);
    }
    const total=()=>{
        let totalam=0;
        props.cart.items.forEach(item=>{
            totalam = totalam+item.price*item.quantity
        })
        return totalam;
    }
    const mrp = ()=>{
        let mrp = 0;
        props.cart.items.forEach(item=>{
            mrp = mrp+item.MRP*item.quantity
        })
        return mrp
    }
    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
      }
      
      function isObj(val) {
        return typeof val === 'object'
      }
      
       function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
          return JSON.stringify(val)
        } else {
          return val
        }
      }
      
      function buildForm({ action, params }) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
      
        Object.keys(params).forEach(key => {
          const input = document.createElement('input')
          input.setAttribute('type', 'hidden')
          input.setAttribute('name', key)
          input.setAttribute('value', stringifyValue(params[key]))
          form.appendChild(input)
        })
      
        return form
      }
      
       function post(details) {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
      }
      const cod="ONLINE"
      const loadScript = (src)=>{
        return new Promise((resolve)=>{
            const script = document.createElement("script")
            script.src = src
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror = ()=>{
                resolve(false)
            }
            document.body.appendChild(script)

        })
      }
    const displayRazorpay = async (orderId)=>{
        console.log("lalaaaaaaaaaaaaaaaaaaatest",orderId)
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if(!res){
            alert("Payment failed to load")
            return
        }
        axios.post('/razorpay',{amount:total()>300?total():total()+40})
        .then((t)=>{
            console.log(t);
            var options = {
                "key":"rzp_live_xV8XqpPhDFWsHa", //"rzp_live_xV8XqpPhDFWsHa", // Enter the Key ID generated from the Dashboard rzp_test_Sn8RPLYLlLXlyD
                "amount": t.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 100000 refers to 1000 rs
                "currency": t.data.currency,
                "name": "Alpine Enterprises",
                "description": "Stationery Order",
                "image": "https://drive.google.com/file/d/1XAuGMqGDi6cAbHXkIP_9JuIgeHtxE9mL/view?usp=sharing",
                "order_id": t.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    axios.post(`/order/create-order`,{token:props.user.user,allProduct:props.cart.items,address:addressvalue,phone:number,paymentMode:option,amount:total()})
                    .then(async doc => {
                        console.log("OrderCreated FOr ONline Mode")
                        console.log(doc.data.orderId)
                        await axios.post(`/order/updateO-data`,[{"propName": "paymentStatus", "value": true}, {"propName":"transactionId", "value": response.razorpay_order_id }],{headers:{"oId":doc.data.orderId}})
                        props.history.push("/orderplaced")
                    })
                  console.log(response)
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open()
        })
       console.log(document.domain)
      
    }
    const buyNow = ()=>{
        console.log(props.user);
        if(props.user.user!==null){
            if(address==="default"||address===null){
                console.log("defaultaddress",address,option);
                if(option==="ONLINE"){
                    displayRazorpay()
                }else{
                    axios.post(`/order/create-order`,{token:props.user.user,allProduct:props.cart.items,address:"",phone:"",paymentMode:option,amount:total()})
                    .then(res=>{
                        props.history.push("/orderplaced")
                    }) 
                }

                // axios.post(`/order/create-order`,{token:props.user.user,allProduct:props.cart.items,address:"",phone:"",paymentMode:option,amount:total()})
                // .then(res=>{
                //     if(option==="ONLINE"){
                //         axios.post(`${process.env.REACT_APP_NONAPI_LINK}/payment`,{token:props.user.user,description:props.cart.items,orderId:res.data.orderId}).then(responsepayment=>{
                //             // let information={
                //             //     action:'https://securegw-stage.paytm.in/order/process', //remove -stage for live
                //             //     params:responsepayment.data
                //             // }
                //             // post(information)
                //             displayRazorpay()
                //                 }).catch(err=>console.log(err))
                //     }else{
                //         props.history.push("/orderplaced")
                //     }
                    
                // })
                


            }
            else if(address==="newaddress"){
                console.log("newaddress",address);
                if(addressvalue.length>0 && number.length>0){
                    //sendreq
                    if(option==="ONLINE"){
                        displayRazorpay()
                    }else{
                        axios.post(`/order/create-order`,{token:props.user.user,allProduct:props.cart.items,address:addressvalue,phone:number,paymentMode:option,amount:total()})
                        .then(res=>{
                            console.log("inside new address and cod payment mehtod",option,addressvalue,number);
                            setError("")
                            props.history.push("/orderplaced")
                        })
                    }
                //     axios.post(`/order/create-order`,{token:props.user.user,allProduct:props.cart.items,address:addressvalue,phone:number,paymentMode:option,amount:total()})
                // .then(res=>{
                //     if(option==="ONLINE"){
                //         // axios.post(`${process.env.REACT_APP_NONAPI_LINK}/payment`,{token:props.user.user,description:props.cart.items,orderId:res.data.orderId}).then(responsepayment=>{
                //         //     let information={
                //         //         action:'https://securegw-stage.paytm.in/order/process', //remove -stage for live
                //         //         params:responsepayment.data
                //         //     }
                //         //     post(information)
                //         //         }).catch(err=>console.log(err))
                //         axios.post(`${process.env.REACT_APP_NONAPI_LINK}/payment`,{token:props.user.user,description:props.cart.items,orderId:res.data.orderId}).then(responsepayment=>{
                //             // let information={
                //             //     action:'https://securegw-stage.paytm.in/order/process', //remove -stage for live
                //             //     params:responsepayment.data
                //             // }
                //             // post(information)
                //             displayRazorpay()
                //                 }).catch(err=>console.log(err))
                //     }else{
                //     console.log("inside new address and cod payment mehtod",option,addressvalue,number);
                //         setError("")
                //         props.history.push("/orderplaced")
                //     }
                    
                // })
                }else{
                    setError("Fill Up the Details")
                    console.log("fill up the details");
                }
            }
            //ONLINE or COD
            //add address and phone form
            // axios.post("/order/create-order",{token:props.user.user,allProduct:props.cart.items,address:"sadat nagar",phone:"9665276786",paymentMode:cod,amount:total()})
            // .then(response=>{
            //     console.log(response.data);
            //     if(response.data.success==="Order created successfully"){
            //         //console.log(response.data.orderId)
            //         if(cod==="COD"){
            //             props.history.push("/")
            //         }else if(cod==="ONLINE"){
                        // axios.post(`${process.env.REACT_APP_NONAPI_LINK}/payment`,{token:props.user.user,description:props.cart.items,orderId:response.data.orderId}).then(responsepayment=>{
                        //     let information={
                        //         action:'https://securegw-stage.paytm.in/order/process', //remove -stage for live
                        //         params:responsepayment.data
                        //     }
                        //     post(information)
                        //         }).catch(err=>console.log(err))
                    // }
                   
            //     }else{
            //         //response.data.error
            //     }
            // }).catch(err=>console.log(err))
                  
        }
        else{
            props.history.push("/signup")
        }
        
    }
    console.log(option)

    return (
        <div>
            <Header id="5" />
            <div className="cartdiv">
            
            <h1>Cart</h1>
            {
               props.cart.items.length===0?(
               <h3 className="sorrymessage">
                   <span style={{display:"block",marginBottom:10}} ><i className="far fa-frown fa-3x"></i></span>
                   Sorry You have Nothing in your cart please buy</h3>):(
               <div>
                      <div className="cartitemsdiv">
                            <div className="head">
                            <div className="heading row">
                                <div className="col-4">
                                <h2>Name</h2>
                                </div>
                                <div className="col-4">
                                <h2>Quantity</h2>
                                </div>
                                <div className="col-2">
                                <h2>Price</h2>
                                </div>
                                <div className="col-2">
                                </div>
                                </div>
                                    {
                                        props.cart.items.map(item =>(
                                <div className="row item">

                                                <div className="col-4">
                                        <h2>{item.name}</h2>
                                    </div>
                                    <div className="col-4">
                                        <h2>
                                        <span 
                                        onClick={()=>item.quantity===1?null:props.decrementItem(item)} 
                                        className="arrows" 
                                        style={{color:"#ccc",fontSize:".8em",margin:"0 3%"}}><i className="fa fa-angle-left" aria-hidden="true"></i></span> {item.quantity} 
                                        <span className="arrows" 
                                        onClick={()=>props.incrementItem(item)} 
                                        style={{color:"#ccc",fontSize:".8em",margin:"0 3%"}}><i className="fa fa-angle-right" aria-hidden="true"></i></span></h2>
                                    </div>
                                    <div className="col-2">
                                        <h2>₹{item.price*item.quantity}</h2>
                                    </div>
                                    <div  className="col-2">
                                    <span className="trashcan" onClick={()=>props.deleteItem(item)}><i className="fa fa-trash" aria-hidden="true"></i></span>
                                    </div>
                                            </div>
                                        ))
                                    }
                                    

                            </div>
                            </div>

                            <div className="bill">
                            <h1>Items : <span>{props.cart.items.length}</span></h1>
                            <h1>MRP : <span>₹{mrp()}</span></h1>
                            <h1 className="discount">Discount : <span>₹{mrp()-total()}</span></h1>
                            <h1>Delivery Fee: <span>{total()>300?"₹0":"₹40"}</span></h1>
                            <h1>Sub Total: <span>₹{total()}</span></h1>
                            <h1 className="total">Total : <span>₹{total()>300?total():total()+40}</span></h1>
                            <form>
                            <p className="heading1">Choose Address</p>
                            <p onClick={()=>setAddress("default")}>
                            <input type="radio" id="test3" name="radio-group" checked={true} />
                            <label htmlFor="test3">Default</label>
                            </p>
                            <p onClick={()=>setAddress("newaddress")}>
                            <input type="radio" id="test4" name="radio-group" checked={address==="newaddress"?true:false}/>
                            <label htmlFor="test4">Add A New Address</label>
                            </p>
                            </form>
                            {
                                console.log(address)
                            }
                            {
                                address==="newaddress"?(<div className="miniform">
                                    <div >
                                    <label>Enter Your Address</label>
                                    <textarea onChange={(e)=>setAddressValue(e.target.value)} placeholder="Enter Your Address" type="text" value={addressvalue} />
                                    </div>
                                    <div > 
                                    <label>Enter Mobile Number</label>
                                    <input onChange={(e)=>setNumber(e.target.value)} placeholder="Enter Your Mobile Number" type="text" value={number} />
                                    </div>
                                    {/* <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row signupcontent">
                                        <div className="col-12">
                                            <label>
                                                Address
                                            </label>
                                            <input className={errors.address?`errorinput`:``} {...register('address',{required:true})} style={{padding:"1% 1%"}} name="address"  placeholder="Enter Your Address" />
                                            {errors.address?<div className="ui pointing red basic label">Address is Invalid</div>:null}
                                        </div>
                                        <div className="col-12">
                                        <button className="blackbutton" type="submit">LogIn</button>
                                        </div> 
                                        </div>
                                    </form> */}
                                </div>):null
                            }
                            <p className="heading2">Choose Payment Method</p>
                            <p onClick={()=>setOption("ONLINE")}>
                            <input type="radio" id="test1" name="radio-group" />
                            <label htmlFor="test1">Pay Via Debit / Credit / UPI / Net Banking</label>
                            </p>
                            {
                                option==="COD"?(
                            <p onClick={()=>setOption("COD")}>
                            <input type="radio" id="test2" name="radio-group" checked />
                            <label htmlFor="test2">Cash on Delivery</label>
                            </p>
                                ):(
                                    <p onClick={()=>setOption("COD")}>
                            <input type="radio" id="test2" name="radio-group" />
                            <label htmlFor="test2">Cash on Delivery</label>
                            </p>
                                )
                            }
                            
                            {
                                error.length>0?<p style={{color:"red"}}>{error}</p>:null
                            }
                            {
                                message.length>0?<p style={{color:"green",fontWeight:"bolder"}}>{message}</p>:null
                            }
                            <button onClick={()=>buyNow()} className="blackbutton">Buy Now</button>
                            </div>
               </div>
               )
            }
                         


            </div>
            <Footer />
        </div>
    );
}

const mapStateToProps=({cart,user})=>{
    return {
        cart,
        user
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        incrementItem:item=>dispatch(incrementItem(item)),
        decrementItem:item=>dispatch(decrementItem(item)),
        deleteItem:item=>dispatch(deleteItem(item))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);