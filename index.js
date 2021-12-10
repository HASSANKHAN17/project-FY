const express = require("express")
const PaytmChecksum = require("./PaytmChecksum")
require("dotenv").config()
const formidable=require("formidable")
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("./server/config/keys");
const path = require('path')
const Razorpay = require('razorpay')
const shortid=require("shortid")
// http://alpinestationeries.herokuapp.com/api/user/all-user
const app = express()

const razorpay = new Razorpay({
  key_id:"rzp_live_xV8XqpPhDFWsHa",//rzp_live_xV8XqpPhDFWsHa rzp_test_Sn8RPLYLlLXlyD
  key_secret:"ESlYH3kbFjDF8MDGynQNKN8Y" //"ESlYH3kbFjDF8MDGynQNKN8Y"   //gYNiAy64SIqvxaoIJudoLA1c  
})

app.use(bodyParser.json())
const PORT = process.env.PORT || 3002;

// Import Router
const authRouter = require("./server/routes/auth");
const contactUsRouter = require("./server/routes/contactUs");
const orderRouter = require("./server/routes/order");
const usersRouter = require("./server/routes/user");
const categoryRouter = require("./server/routes/category");
const productRouter = require("./server/routes/product");
const countRouter = require("./server/routes/count");
// const { default: User } = require("./client/src/components/User/User");

// Model
let userModel = require("./server/models/user"); 
let orderModel = require("./server/models/order")

// Middleware
//app.use(cookieParser());
app.use(cors());
if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))

  })
}
//https://alpinedashboard.vercel.app/
//app.use(express.static("public"));
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

// Routes
app.use("/", authRouter);
app.use("/user", usersRouter);
app.use("/contactUs", contactUsRouter);
app.use("/order", orderRouter);
app.use("/count", countRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))

  })
}

app.post("/razorpay",async (req,res)=>{
  const payment_capture=1;
  const amount=req.body.amount;
  currency="INR"
  razorpay.orders.create({
    amount:amount*100,currency,receipt:shortid.generate(),payment_capture
  }).then(response=>{
    console.log("____________________________________________________________________")
    console.log(response)
    res.status(200).json({
      id:response.id,
      currency:response.currency,
      amount:response.amount
    })
  })
  .catch(err=>console.log(err))
  
})

// Payments Routes
app.post("/callback",(req,res)=>{
  console.log("in callback");
    const form = new formidable.IncomingForm()
    // console.log(form)
    form.parse(req,async (err,fields,file)=>{
      console.log("in form.parse");
      // console.log(fields)
      if(err){
          console.log(err)
      }
      paytmChecksum = fields.CHECKSUMHASH;
      delete fields.CHECKSUMHASH;
      //merchant id kupXTo83613795537613
      //merchant key KcD6HXTx4gx%r4hl
      //test key Xd&_NRTpc1aDkAJ6
      var isVerifySignature = PaytmChecksum.verifySignature(fields,process.env.MERCHENT_KEY , paytmChecksum);
      //console.log(fields)
      if (isVerifySignature) {
      //  console.log(fields)
          if(fields.STATUS==='TXN_SUCCESS'){
            //once payment is verified then set the flag as verfied and push the description i.e cart items to history array of user
            // console.log(fields.ORDERID)
            let updatedOrder = await orderModel.updateOne({_id: fields.ORDERID},{$set: {paymentStatus: true, transactionId: fields.TXNID}})
            if(updatedOrder){
              console.log(updatedOrder)
            }
            res.redirect("https://alpinestationery.in/orderplaced")
            
        }else {
          //once payment is failed then delete the current assigned object whose flag was set as not verfied
          let updatedOrder = await orderModel.deleteOne({_id: fields.ORDERID})
          if(updatedOrder){
            console.log(updatedOrder)
          }
          res.send("Payment Failed")
          }
        //push the payment json to transaction details
      } 
    })
})

app.post("/payment",async (req,res)=>{ //you get array buffer when you use wrong credentials
  var params = {};
  //decode token
  function TotalPrice(items){
    let totalam=0;
    items.forEach(item=>{
        totalam = totalam+item.price*item.quantity
    })
    if(totalam > 300){
      return totalam.toString()
    } else {
      totalam =totalam+40
      totalam.toString()
      return totalam.toString()
    }
    
  }
  console.log(TotalPrice(req.body.description))
    //  req.body.token
    // console.log(req.body.token)
    let decoded = jwt.verify(req.body.token, JWT_SECRET);
    // console.log(decoded)
    const email = await userModel.findById(decoded._id);
    console.log("_________________________________________________________________")
    console.log(req.body)

    /* initialize an array */
    params['MID'] = process.env.PAYTM_MID;
    params['WEBSITE'] = process.env.PAYTM_WEBSITE;
    params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
    params['INDUSTRY_TYPE_ID'] = 'Retail';
    params['ORDER_ID'] = req.body.orderId
    params['CUST_ID'] = `EWF_10${email.email.replace("@gmail.com","")}`;
    params['TXN_AMOUNT'] = TotalPrice(req.body.description);
    params['CALLBACK_URL'] = `https://alpinestationery.in/callback`;
    params['EMAIL'] = `${email.email}`;
    params['MOBILE_NO'] = "";
    


//user token
    //add req.body.description(cart items) to one object and set it's flag to 
    //payment not verified

    /**
     * https://securegw-stage.paytm.in/
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    var paytmChecksum = PaytmChecksum.generateSignature(params,process.env.MERCHENT_KEY );//process.env.MERCHENT_KEY
    paytmChecksum.then(function(checksum){
    let paytmParams={
        ...params,
        "CHECKSUMHASH":checksum
      }
      res.json(paytmParams)
    })
    .catch(function(error){
      console.log(error);
    });
})


// Run Server
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
