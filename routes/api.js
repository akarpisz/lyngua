const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const { User, Translation } = require("../models");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("token error");

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).send("Token Error");
  }
  next();
};

// //translation routes

// //get a user's saved translations
router.get("/savedtrans", checkToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let decoded = jwt.decode(token);
  console.log(decoded);

  db.Translation.find(
    { username: decoded.user.username, user_id: decoded.user["_id"] },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send("DB error");
      }
      console.log(data);
      return res.json(data);
    }
  );
});

//add user translation
router.post("/newtrans", checkToken, async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let decoded = jwt.decode(token);

    const { toLang, fromTxt } = req.body.data;

    var text = JSON.stringify([{ Text: `${fromTxt}` }]);

    var config = {
      method: "post",
      url: `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${toLang}`,
      headers: {
        "Ocp-Apim-Subscription-Key":
          process.env.TRANSLATOR_TEXT_SUBSCRIPTION_KEY,
        "Content-Type": "application/json",
      },
      data: text,
    };

    let { data } = await axios(config);
    console.log(data);

    let newTrans = new Translation({
      user_id: decoded.user["_id"],
      username: decoded.user.username,
      fromLang: data[0].detectedLanguage.language,
      toLang: data[0].translations[0].to,
      fromTxt: fromTxt,
      toTxt: data[0].translations[0].text,
      timestamp: Date.now(),
      starred: false,
    });

    db.Translation.create(newTrans, (err, result) => {
      if (err) {
        throw err;
      }
      return result;
    });
    console.log(JSON.stringify(data[0].translations[0].text));
    console.log(JSON.stringify(data[0].translations[0].to));

    //db.Translation.create();
    return res.json(data);
    //data needs JSON.stringify()
  } catch (err) {
    console.log(err);
    return err;
  }
});

router.get("/supportedlangs", async (req, res) => {
  console.log("received req");
  let clientTraceId = uuidv4().toString();
  console.log(clientTraceId);
  let result = await axios(process.env.TRANSLATOR_TEXT_ENDPOINT, {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.TRANSLATOR_TEXT_SUBSCRIPTION_KEY,
      "Content-type": "application/json",
      "X-ClientTraceId": clientTraceId,
    },
  });
  return res.json(result.data.translation);
});
// //delete a user translation
router.delete("/deltrans", checkToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);
  const trans_id = req.body.id
  console.log(decoded);
  db.Translation.deleteOne({_id: trans_id, username: decoded.user.username, user_id: decoded.user["_id"]}, (err)=> {
    if (err){
      return res.status(500).send("DB delete error")
    }
    console.log("deleted record");
  })
  return res.status(200).send("delete successful");
  
});

//update translation (basically only for favoriting)
router.put("/startrans",  checkToken, (req, res)=>{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET);

  db.Translation.findOneAndUpdate({ _id:req.body.id, username: decoded.user.username, user_id: decoded.user._id}, {$set: {starred: req.body.newState}}, (err)=>{
    if (err){
      console.log(err);
      return res.status(500).send("DB error");
    }

    return res.status(200).send("DB updated");
  })
})

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
      let match = await user.comparePass(password);

      console.log(` match : ${match}`);
      if (match) {
        jwt.sign(
          { user },
          process.env.SECRET,
          { expiresIn: "2h" },
          (err, token) => {
            if (err) {
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
