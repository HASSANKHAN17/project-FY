const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.post("/get-all-product", productController.getAllProduct);

router.post("/create-product", upload.single('productImage'), productController.createProduct);
router.post("/update-product", productController.createProduct);
router.post("/delete-product", productController.createProduct);

module.exports = router;

