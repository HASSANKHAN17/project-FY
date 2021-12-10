const express = require("express");
const router = express.Router();
const contactUsController = require("../controller/contactUs");


router.post("/sendMail", contactUsController.getMailFromUser);



module.exports = router;