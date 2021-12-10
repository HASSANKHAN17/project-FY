const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

router.post("/get-all-category", categoryController.getAllCategory);

router.post("/create-category", categoryController.createCategory);
router.post("/update-category", categoryController.updateCategory);
router.post("/delete-category", categoryController.deleteCategory);

module.exports = router;