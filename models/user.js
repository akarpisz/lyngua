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
    validate: function (e) {
      //regex email check
      return e;
    },
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
  //     try{
  //         console.log(typeof submitPass);
  //         console.log(typeof this.password);
  //         console.log(`${submitPass}`);
  //         console.log(`${this.password}`);
  //     let match = await bcrypt.compareSync(submitPass, this.password)
  //     console.log(match);
  //     return match;
  // } catch(err){
  //     return err;
  // }
};

// UserSchema.methods.comparePass = function(submitPass, cb){
//     let match = bcrypt.compareSync(submitPass, this.password)
//         console.log(submitPass);
//         console.log(this.password);
//     if(match){
//         cb(null, isMatch);
//     }
//     else {
//         cb(err)
//     }

// }

const User = mongoose.model("User", UserSchema);
module.exports = User;
