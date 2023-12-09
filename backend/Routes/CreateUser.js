// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');

// router.post('/createuser', [
// body("email").isEmail(),
// body("name").isLength({min: 5 }),
// body("password","Incorrect Password").isLength({ min: 5 })]
// ,async (req, res) => {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array()});
//     }

//     try {
//         User.create({
//             name: req.body.name,
//             password: req.body.password,
//             email: req.body.email,
//             location: req.body.location
//         })

//     res.json({success:true})

//     }catch {errors} {
//         res.json({success:false})
//     }
// try {
//     const { name, password, email, location } = req.body;

//     // Assuming User.create returns a promise
//     const createdUser = await User.create({
//         name,
//         password,
//         email,
//         location
//     });

//     if (!createdUser) {
//         res.status(400).send({ message: 'Something went wrong' });
//     } else {
//         res.send(createdUser);
//     }
// } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: 'Server not available' });
// }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "MyNameisTanzeemkhan"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash( req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const data = {
        user:{
            id:userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
