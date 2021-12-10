const { toTitleCase, validateEmail, validatePhoneNumber, phoneNumberCheckInDatabase } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, cPassword, address, pin, phoneNumber } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword || !address || !pin || !phoneNumber) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
        address: "Filed must not be empty",
        pin: "Filed must not be empty",
        phoneNumber: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { message: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        if(validatePhoneNumber(phoneNumber)){
          name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            // ...error,
            // password: "Password must be 8 charecter",
            // name: "",
            // email: "",
            // pin: "",
            // address: "",
            // phoneNumber: ""
            message :"Password must be 8 charecter",
          };
          return res.json({ error });
        } else if (password != cPassword) {
          error = {
            // ...error,
            // cPassword: "Not Match",
            // password: "Not Match",
            // name: "",
            // email: "",
            // pin: "",
            // address: "",
            // phoneNumber: ""
            message :"Password not Match",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
              password = bcrypt.hashSync(password, 10);
              const data = await userModel.findOne({ email: email });
              const data2 = await userModel.findOne({ phoneNumber: phoneNumber });
              if (data) {
                error = {
                  // ...error,
                  // password: "",
                  // name: "",
                  // email: "Email already exists",
                  message :"Email already Exists",
                };
                return res.json({ error });
              } else if (data2) {
                error = {
                  // ...error,
                  // password: "",
                  // name: "",
                  // email: "Email already exists",
                  message :"Phone Number already Exists",
                };
                return res.json({ error });
              } else {
                let newUser = new userModel({
                  name,
                  email,
                  password,
                  pin,
                  address,
                  phoneNumber,
                  
                });
                newUser
                  .save()
                  .then((data) => {
                    return res.json({
                      success: "Account create successfully. Please login",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
          } catch (err) {
            console.log(err);
          }
        }
        } else {
          error = {
            // ...error,
            // password: "",
            // name: "",
            // email: "",
            // pin: "",
            // address: "",
            // phoneNumber: "Phone Number is not valid",
            message :"Phone Number is not valid",
          };
          return res.json({ error });
        }
      } else {
        error = {
          // ...error,
          // password: "",
          // name: "",
          // email: "Email is not valid",
          // pin: "",
          // address: "",
          // phoneNumber: ""
          message :"Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.json({
        message: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ phoneNumber: phoneNumber });
      if (!data) {
        return res.json({
          message: "Invalid Phone Number or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            message: "success",
          });
        } else {
          return res.json({
            message: "Invalid Phone Number or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
