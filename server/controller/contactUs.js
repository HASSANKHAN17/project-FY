
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
let Count = require("../models/count")

class ContactUs{

    async getMailFromUser(req, res) {
        const mailjet = require ('node-mailjet')
        .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                    "From": {
                        "Email": "alpinestationery@gmail.com",
                        "Name": "Contact us"
                    },
                    "To": [
                        {
                            "Email": "alpinestationery@gmail.com",
                            "Name": "Admin"
                        }
                    ],
                    "TemplateID": 2962766,
                    "TemplateLanguage": true,
                    "Subject": "Hey Admin we have a mail from a User",
                    "Variables": {
        "userName": `${req.body.name}`,
        "phoneNumber": `${req.body.phoneNumber}`,
        "message": `${req.body.message}`
        }
                }
            ]
        })
        request
        .then((result) => {
            console.log(result.body)
            res.json({
                message: "success"
            })
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
      }

      async increaseCount(req, res) {
        let count = await Count.updateOne({}, {$inc: {count: 1}}) ;
        if(count){
            console.log(count)
            res.json({meassage: "Successfully increamented Count"})
        } else {
            res.json({meassage: "Something went wrong"})
        }

    }

    async getCount(req, res) {
        let count = await Count.find({}) ;
        if(count){
            console.log(count)
            res.json({
                meassage: "Success",
                Count: count
            })
        } else {
            res.json({meassage: "Something went wrong"})
        }

    }

}



const contactUsController = new ContactUs();
module.exports = contactUsController;