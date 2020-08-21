const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20, 
        unique: true,
        trim: true 
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: function(e){
            //regex email check
            return e;
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    nativeLang: {
        type: String,
        minlength: 2,
        maxlength: 2,
    },
    // connectedWith: [{
    //     username: {
    //         type: String
    //     }
    // }],
});
//initalize schema below;
const User = mongoose.model(UserSchema, "User");
module.exports = User;