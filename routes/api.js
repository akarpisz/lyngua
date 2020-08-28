const express = require("express");
const router = express.Router();
const db = require("../models");
// const bcrypt = require('bcrypt');
const { User } = require("../models");
//const passportJWT = require('passport-jwt');
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
// //translation routes
// //get a user's saved translations
// router.get("/api/:user/translations", (req, res)=>{

// });

// //add user translation
// router.post("/api/:user/translations", (req, res)=>{

// });
// //delete a user translation
// router.delete("/api/:user/translation/:id", (req, res)=>{
//     let id = req.params.id;

// });
// //update translation (basically only for favoriting)
// router.put("/api/:user/translation/:id", (req, res)=>{

// })

// //user routes
// //get user data
router.get("/api/:username",
(req,res)=>{
    console.log(req.headers)
});

// //delete user
// router.delete("/api/:userid", (req,res)=>{

// });
// //update user info
// router.put("/api/:userid", (req,res)=>{
//     //updated fields from req.body
// })

// //create new user
router.post("/signup", (req, res) => {
  let newUser = new User(req.body);

  db.User.create(newUser, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("problem creating new user");
    }
    console.log(result);
    return res.status(200).send("new user created");
  });
});

//user signin
router.post("/login", function (req, res) {
  console.log(req.body);
  const { username } = req.body;
  const { password } = req.body;

  db.User.findOne({ username: username }, async function (err, user) {
    try {
      if (err) {
        throw err;
      }
      console.log(user);
      let match = await user.comparePass(
        //   user.password,
        password);

      console.log(` match : ${match}`);
      if (match) {
        jwt.sign(
          { user },
          process.env.SECRET,
          { expiresIn: "2h" },
          (err, token) => {
            if (err) {
                console.log('Error');
              throw err;
            }
            console.log('token sent');
            return res.send(token);
          }
        );
      } else {
        return res.status(401).end("login failed. check credentials");
      }
    } catch (err) {
      return err;
    }
  });
});

// //message routes (*deep breaths*)
// //user getting their messages
// router.get("/api/messages/:userid", (req,res)=>{

// });

// //user new message
// router.post("/api/messages/:to/:from", (req, res)=>{

// });

// router.put("/api/messagee")
// //user deleting conversation. maybe
// router.delete("/api/messages/:to/:from", (req, res)=>{

// })

module.exports = router;
