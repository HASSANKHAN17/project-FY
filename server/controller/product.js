
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const dateP = require('date-and-time');



  const productModel = require("../models/product")

class Product {

    async getAllProduct(req, res) {
        try {
          let products = await productModel
            .find({})
            .sort({ createdAt: -1 });
          if (products) {
            return res.json({ products });
          }
        } catch (err) {
          console.log(err);
          return res.json({ message: err });
        }
      }

      async createProduct(req, res) {
        let { name, price, mrp, quantity,type, category } = req.body;
        if (
         !name ||
         !price||
         !mrp ||
         !quantity ||
         !type||
         !category
        ) {
          return res.json({ err: "All filled must be required" });
        } else {
          try {
            const now = new Date();
            console.log(dateP.format(now, 'YYYY/MM/DD HH:mm:ss'),)
            let newProduct = new productModel({
                name,
                price,
                mrp,
                quantity,
                type,
                category,
                productImage: req.file.path
            });
            let save = await newProduct.save();
            if (save) {
                console.log(save)
              return res.json({ success: "Product created successfully",
                                productName: save.name
                                });
            }
          } catch (err) {
              console.log(err)
            return res.json({ error: err });
          }
        }
      }
}

const productController = new Product();
module.exports = productController;
