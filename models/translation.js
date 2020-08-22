const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TranslationSchema = new Schema({
    fromLang: {
        type: String,
        maxlength: 2,
        minlength: 2,
    },
    toLang: {
        type: String,
        maxlength: 2,
        minlength: 2,
    },
    fromTxt: {
        type: String,
        minlength:1,
        //May remove maxlength param for production
        maxlength:1000,
        trim: true,
        required: true
    },
    toTxt: {
        type: String,
    },
    timeStamp : {
        type: Date,
    },
    starred: {
        type: Boolean,
        default: false
    }

});

//initialize
const Translation = mongoose.model( "Translation", TranslationSchema)
module.exports = Translation;