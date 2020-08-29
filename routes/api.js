const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
// const bcrypt = require('bcrypt');
const { User } = require("../models");
//const passportJWT = require('passport-jwt');
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require("uuid");

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// //translation routes

// //get a user's saved translations
// router.get("/api/translations", (req, res)=>{

// });

//add user translation
router.post("/api/translations", validateToken, (req, res) => {});

router.get("/supportedlangs", async (req, res) => {
  console.log("received req");
  let clientTraceId = uuidv4().toString(); 
  console.log(clientTraceId);
  let result= await axios(process.env.TRANSLATOR_TEXT_ENDPOINT, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.TRANSLATOR_TEXT_SUBSCRIPTION_KEY,
      "Content-type": "application/json",
      "X-ClientTraceId": clientTraceId,
    },
  })
  return res.json(result.data.translation);
});
// //delete a user translation
// router.delete("/api/:user/translation/:id", (req, res)=>{
//     let id = req.params.id;

// });
// //update translation (basically only for favoriting)
// router.put("/api/:user/translation/:id", (req, res)=>{

// })

// //user routes
// //get user data
router.get("/getuser", validateToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  const user = decoded.user.username;

  db.User.findOne({ username: user }, (err, data) => {
    if (err) {
      return res.status(500).end("problem finding user in database");
    }
    return res.send(data);
  });
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
        password
      );

      console.log(` match : ${match}`);
      if (match) {
        jwt.sign(
          { user },
          process.env.SECRET,
          { expiresIn: "2h" },
          (err, token) => {
            if (err) {
              console.log("Error");
              throw err;
            }
            console.log("token sent");
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
