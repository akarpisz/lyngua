const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = require('../models');
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
// router.get("/api/:username", 
// //isAuthenticated, 
// (req,res)=>{

// });

// //delete user
// router.delete("/api/:userid", (req,res)=>{

// });
// //update user info
// router.put("/api/:userid", (req,res)=>{
//     //updated fields from req.body
// })

// //create new user
router.post("/signup", (req,res)=>{
    // console.log(req.body);
    let newUser = new User(req.body);
    console.log(newUser);
    console.log(typeof newUser);
    db.User.create(newUser, (err, result)=>{
        if(err) {
            return res.status(500).send('problem creating new user');
        }
        console.log(result);
        return res.status(200).send('new user created');
    })
});

// //user signin
// router.get("/api/login", (req, res) => {

// });

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