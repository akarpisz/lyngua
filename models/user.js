const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
    
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: true,
  },
  nativeLang: {
    type: String,
    minlength: 2,
    maxlength: 2,
  },
});

UserSchema.pre("save", function (next) {
  let newUser = this;
  console.log(newUser.username); //getting undefined here
  bcrypt.hash(newUser.password, 10, function (err, hash) {
    if (err) return next(err);
    newUser.password = hash;
    next();
  });
});

UserSchema.methods.comparePass = function (submitPass) {
  return bcrypt.compareSync( submitPass, this.password
    , function (err, isMatch) {
    console.log("comparing");
    if (err) {
      return err;
    }
    return isMatch;
  }
  );
  
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
