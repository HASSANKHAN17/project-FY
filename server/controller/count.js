
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
let countModel = require("../models/count")

class Counts{

      async increaseCount(req, res) {
        let count = await countModel.updateOne({}, {$inc: {count: 1}}) ;
        if(count){
            console.log(count)
            res.json({meassage: "Successfully increamented Count"})
        } else {
            res.json({meassage: "Something went wrong"})
        }

    }

    async getCount(req, res) {
        let count = await countModel.find({})
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



const countController = new Counts();
module.exports = countController;