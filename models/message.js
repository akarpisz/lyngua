const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
  //id
  members: [
    {
      type: String,
      require: true,
      unique: true,
    },
  ],
  messages: [
    {
      sender: {
        type: String,
        required: true,
      },
      receiver: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        maxlength: 500,
        minlength: 1,
        trim: true,
      },
      timeStamp: {
        type: Date,
        required: true,
      },
    },
  ],
});
//initalize schema below;
const Message = mongoose.model("Message", MsgSchema);
module.exports = Message;
