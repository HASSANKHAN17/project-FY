
const categoryModel = require("../models/category")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const dateP = require('date-and-time');

class Category {

    async getAllCategory(req, res) {
        try {
          let Categories = await categoryModel.find({}).sort({ _id: -1 });
          if (Categories) {
            return res.json({ Categories });
          }
        } catch (err) {
          console.log(err);
          return res.json({ 
            error: err
        });
        }
      }

      async createCategory(req, res) {
        let { cName } = req.body;
        if (!cName) {
            return res.json({ error: "All filled must be required" });
        } else {
          console.log(cName)
          try {
            let checkCategoryExists = await categoryModel.findOne({ name: cName });
            if (checkCategoryExists) {
                return res.json({ error: "Category already exists" });
            } else {
              let newCategory = new categoryModel({
                name: cName
              });
              newCategory.save((err) => {
                if (err) {
                  return res.json({ message: err});
                }else {
                  return res.json({ success: "Category created successfully" });
                }

              });
            }
          } catch (err) {
            console.log(err);
            return res.json({ 
                error: err
            });
          }
        }
      }

      async updateCategory(req, res) {
        let { cName, cId } = req.body;
        if (!cName, cId) {
          return res.json({ error: "All filled must be required" });
        }
        try {
          let editCategory =await categoryModel.UpdateOne({_id: cId}, {$set:
            {name: cName}
          });
          if (editCategory) {
            return res.json({ success: "Category edit successfully" });
          }
        } catch (err) {
          console.log(err);
          return res.json({ 
            error: err
        });
        }
      }

      async deleteCategory(req, res) {
        let { cId } = req.body;
        if (!cId) {
          return res.json({ error: "All filled must be required" });
        } else {
          try {
    
            let deleteCategory = await categoryModel.deleteOne({_id: cId});
            if (deleteCategory) {
                return res.json({ success: "Category deleted successfully" });
            }
          } catch (err) {
            console.log(err);
            return res.json({ 
                error: err
            });
          }
        }
      }
}



const categoryController = new Category();
module.exports = categoryController;