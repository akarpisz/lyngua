const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TranslationSchema = new Schema({

});

//initialize
const Translation = mongoose.model(TranslationSchema, "Translation")
module.exports = Translation;