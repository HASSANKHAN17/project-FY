const express = require("express");
const router = express.Router();
const countController = require("../controller/count");


router.post("/increaseCount", countController.increaseCount);
router.post("/getCount", countController.getCount);



module.exports = router;