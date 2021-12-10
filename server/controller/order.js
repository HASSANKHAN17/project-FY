const orderModel = require("../models/order");
const userModel = require("../models/user")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const dateP = require('date-and-time');

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        // .populate("history")
        .populate("user", "name email")
        .sort({ createdAt: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { token } = req.body;
    if (!token) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let decoded = jwt.verify(token, JWT_SECRET);
        let Order = await orderModel
          .find({ user: decoded._id })
          // .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    let { allProduct, amount, transactionId, address, phone, paymentMode, token } = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);
    if (
      !allProduct ||
      !amount ||
      // !address ||
      // !phone ||
      !paymentMode ||
      !token
    ) {
      return res.json({ err: "All filled must be required" });
    } else {
      try {
        
        
        if(phone === "" && address === ""){
          let currentUser = await userModel
                .findById(decoded._id)
                .select("phoneNumber address")
          address = currentUser.address;
          phone = currentUser.phoneNumber;
        }
        let currentUser = await userModel
                .findById(decoded._id)
        const now = new Date();
        // console.log(dateP.format(now, 'YYYY/MM/DD HH:mm:ss'),)
        let newOrder = new orderModel({
          date: dateP.format(now, 'YYYY/MM/DD HH:mm:ss'),
          allProduct,
          user: decoded._id,
          amount,
          address,
          phone,
          paymentMode,
        });
        let save = await newOrder.save();
        if (save) {
          console.log(save)
          let orderId = await userModel.updateOne({_id: decoded._id},{$push: {history:save._id}})
          if(orderId){
            console.log("sending Mail....")
            const mailjet = require ('node-mailjet')
            .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
            const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
              "Messages":[
                {
                  "From": {
                    "Email": "alpinestationery@gmail.com",
                    "Name": "Alpine Stationery"
                  },
                  "To": [
                    {
                      "Email": "alpinestationery@gmail.com",
                      "Name": "Admin"
                    },
                    {
                      "Email": currentUser.email,
                      "Name": currentUser.name
                    }
                  ],
                  "TemplateID": 3175578,
                  "TemplateLanguage": true,
                  "Subject": `hi [[data:userName:${currentUser.name}]], Your order [[data:orderId:${save.id}]] has been placed`,
                  "Variables": {
                      "selectedProducts": allProduct,
                      "userName": currentUser.name,
                      "orderId": save.id,
                      "total": amount
                  }
                }
              ]
            })
            request
            .then((result) => {
              console.log(result.body)
            })
            .catch((err) => {
              console.log(err.statusCode)
            })
          return res.json({ success: "Order created successfully",
                            orderId: save._id
                          });
          }
        }
      } catch (err) {
        return res.json({ error: err });
      }
    }
  }

  async postUpdateOrder(req, res) {
    let { status, oId } = req.body;
      if (!status || !oId) {
        let decoded = jwt.verify(token, JWT_SECRET);
        return res.json({ message: "Field Required" });
      } else {
        let currentOrder = await orderModel.updateOne({_id: oId}, {
          status: status,
          updatedAt: Date.now(),
        });
        if(currentOrder){
            return res.json({ message: "success" });
        }
      }
  }

  async updateData(req, res) {
   console.log(req.headers.oId, "fdsfdsfsdfs")
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    console.log(updateOps)

    let currentOrder = orderModel.findByIdAndUpdate(req.headers.oId, {
      $set: updateOps
    });
    currentOrder.exec((err, result) => {
      if (err) console.log(err);
      return res.json({ success: "User updated successfully" });
    });
  }


  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async returnOrder(req, res) {
    console.log("Return__________________________________________________________________________________________________")
    let { bankAccountNo, ifscCode, bankName, bankBranch, token , orderId} = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);

    let user = await userModel.findById({_id: decoded._id});
    if (user){
      

      let order = await orderModel.updateOne({_id: orderId}, {$set: {status: "Return in Process"}})
      if(order) {
        console.log(user)
      console.log(bankAccountNo, ifscCode, bankName, bankBranch,token , orderId)
        const mailjet = require ('node-mailjet')
        .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "techgeeksfs@gmail.com",
                "Name": "Hello Shaikh"
              },
              "To": [
                {
                  "Email": "alpinestationery@gmail.com",
                  "Name": "passenger 1"
                }
              ],
              "TemplateID": 3021313,
              "TemplateLanguage": true,
              "Subject": "Hey Admin, we have a RETURN request",
              "Variables": {
                "userName": `${user.name}`,
                "phoneNumber": `${user.phoneNumber}`,
                "email":`${user.email}`,
                "userAddress": `${user.address}`,
                "pinCode": `${user.pin}`,
                "orderId": `${orderId}`,
                "bankName": `${bankName}`,
                "ifscCode": `${ifscCode}`,
                "bankBranch": `${bankBranch}`,
                "accountNumber": `${bankAccountNo}`,
          }
            }
          ]
        })
        request
        .then((result) => {
          console.log(result.body);
          return res.json({ message: "success" });
        })
        .catch((err) => {
          console.log(err.statusCode)
        })
      } else {
        return res.json({ message: "Somthing went Wrong" });
      }
    }
  }

  async cancelOrder(req, res) {
    console.log("Cancelled__________________________________________________________________________________________________")
    let { bankAccountNo, ifscCode, bankName, bankBranch, token , orderId} = req.body;
    let decoded = jwt.verify(token, JWT_SECRET);

    let user = await userModel.findById({_id: decoded._id});
    if (user){

      let order = await orderModel.findById({_id: orderId})
      if(order.paymentMode === "ONLINE") {

        let changeOrder = await orderModel.updateOne({_id: order._id},{$set: {status: "Cancelled"}})
        console.log(changeOrder)
        console.log("sending Mail....")
        const mailjet = require ('node-mailjet')
        .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "techgeeksfs@gmail.com",
                "Name": "Hello Shaikh"
              },
              "To": [
                {
                  "Email": "alpinestationery@gmail.com",
                  "Name": "Admin"
                }
              ],
              "TemplateID": 3021619,
              "TemplateLanguage": true,
              "Subject": "Hey Admin, we have a CANCEL request",
              "Variables": {
                "userName": `${user.name}`,
                "phoneNumber": `${user.phoneNumber}`,
                "email":`${user.email}`,
                "userAddress": `${user.address}`,
                "pinCode": `${user.pin}`,
                "orderId": `${orderId}`,
                "bankName": `${bankName}`,
                "ifscCode": `${ifscCode}`,
                "bankBranch": `${bankBranch}`,
                "accountNumber": `${bankAccountNo}`,
          }
            }
          ]
        })
        request
        .then((result) => {
          console.log("seccessfully send mail 1111")
          console.log(result.body);
          return res.json({ message: "success" });
        })
        .catch((err) => {
          console.log(err)
          console.log(err.statusCode)
        })
      } else if(order.paymentMode === "COD") {
        let changeOrder = await orderModel.updateOne({_id: order._id},{$set: {status: "Cancelled"}});


        const mailjet = require ('node-mailjet')
        .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "techgeeksfs@gmail.com",
                "Name": "Hello Shaikh"
              },
              "To": [
                {
                  "Email": "alpinestationery@gmail.com",
                  "Name": "passenger 1"
                }
              ],
              "TemplateID": 3021619,
              "TemplateLanguage": true,
              "Subject": "Hey Admin, we have a CANCEL request",
              "Variables": {
                "userName": `${user.name}`,
                "phoneNumber": `${user.phoneNumber}`,
                "email":`${user.email}`,
                "userAddress": `${user.address}`,
                "pinCode": `${user.pin}`,
                "orderId": `${orderId}`,
                "bankName": "COD",
                "ifscCode": "COD",
                "bankBranch": "COD",
                "accountNumber": "COD",
          }
            }
          ]
        })
        request
        .then((result) => {
          console.log("seccessfully send mail 22222")
          console.log(result.body);
          return res.json({ message: "success" });
        })
        .catch((err) => {
          console.log(err)
          console.log(err.statusCode)
        })


        // return res.json({ message: "success" });
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
