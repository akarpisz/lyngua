const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const app = express();
const routes = require("./routes/api");
const PORT = process.env.PORT || 3001;
const passport =require("./config/passport");
require("dotenv").config(path.join(__dirname, "/.env"));

mongoose.set('useCreateIndex', true)
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/lyngua")

app.use(passport.initialize());
app.use(passport.session());
//change to client/build for production
app.use(express.static(path.join(__dirname, "client/public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(logger("dev"));
app.use("/api",routes);

app.listen(PORT, ()=>{
    console.log(`App started, server listening on port ${PORT}`);
})